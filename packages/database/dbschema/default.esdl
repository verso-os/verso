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

module auth {
    type Project extending default::Base {
        required name: str;
        multi users := .<project[is User]
    }

    type User extending default::Base {
        required email: str;
        hashed_password: str;
        required project: Project;
        multi sessions := .<user[is Session];
        constraint exclusive on ((.email, .project));
    }

    type Session extending default::Base {
        required user: User;
        required refresh_token: str;
        required expires_at: datetime;
    }
}

