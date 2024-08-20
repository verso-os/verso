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

        created_at_day := datetime_truncate(.created_at, 'days');
        created_at_week := datetime_truncate(.created_at, 'weeks');
        created_at_month := datetime_truncate(.created_at, 'months');
        created_at_year := datetime_truncate(.created_at, 'years');
        
        updated_at_day := datetime_truncate(.updated_at, 'days');
        updated_at_week := datetime_truncate(.updated_at, 'weeks');
        updated_at_month := datetime_truncate(.updated_at, 'months');
        updated_at_year := datetime_truncate(.updated_at, 'years');
    }
}

module service {
    type Application extending default::Base {
        required name: str;
        multi users := .<application[is User];
        multi webhooks := .<application[is Webhook];
    }

    type User extending default::Base {
        required email: str;
        hashed_password: str;
        required application: Application {
            on target delete delete source;
        };
        multi sessions := .<user[is Session];
        index on (.application);
        index on (.email);
        constraint exclusive on ((.email, .application));
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
        required application: Application {
            on target delete delete source;
        };
        index on (.application);
        index on (.provider);
        index on (.provider_user_id);
        constraint exclusive on ((.provider_user_id, .provider, .application));
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
        required application: Application {
            on target delete delete source;
        };
        required url: str;
        required secret: str;
        multi events := .<webhook[is WebhookEvent];
        index on (.application);
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

