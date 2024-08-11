module default {
    abstract type Base {
        required created_at: datetime {
            default := datetime_current();
            readonly := true;
        };
        required updated_at: datetime {
            default := datetime_current();
            rewrite insert using (datetime_of_statement());
            rewrite update using (datetime_of_statement());
        };
    }
}

module service {
    type Project extending default::Base {
        required name: str;
        multi users := .<project[is User];
        multi webhooks := .<project[is Webhook];
    }

    type User extending default::Base {
        required email: str;
        hashed_password: str;
        required project: Project {
            on target delete delete source;
        };
        multi sessions := .<user[is Session];
        index on (.project);
        index on (.email);
        constraint exclusive on ((.email, .project));
    }

    type Session extending default::Base {
        required user: User {
            on target delete delete source;
        };
        required expires_at: datetime;
        index on ((.user));
    }

    type OAuth2Account extending default::Base {
        required user: User {
            on target delete delete source;
        };
        required provider: str;
        required provider_user_id: str;
        required project: Project {
            on target delete delete source;
        };
        index on (.project);
        index on (.provider);
        index on (.provider_user_id);
        constraint exclusive on ((.provider_user_id, .provider, .project));
    }

    type EmailVerificationCode extending default::Base {
        required user: User {
            constraint exclusive;
            on target delete delete source;
        };
        required code: str;
        required expires_at: datetime;
        index on ((.user));
    }

    type Webhook extending default::Base {
        required project: Project {
            on target delete delete source;
        };
        required url: str;
        required secret: str;
        multi events := .<webhook[is WebhookEvent];
        index on (.project);
    }

    type WebhookEvent extending default::Base {
        required webhook: Webhook {
            on target delete delete source;
        };
        required type: WebhookEventType;
        required status: int16;
        required payload: str;
        required response: str;
        index on (.webhook);
    }

    scalar type WebhookEventType extending enum<
        UserCreated,
        UserUpdated,
        UserDeleted,
    >;
}

