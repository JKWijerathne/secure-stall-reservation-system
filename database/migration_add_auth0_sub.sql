-- Run this once for databases created before Auth0 subject persistence was added.
ALTER TABLE users
    ADD COLUMN IF NOT EXISTS auth0_sub VARCHAR(255);

CREATE UNIQUE INDEX IF NOT EXISTS users_auth0_sub_unique
    ON users (auth0_sub)
    WHERE auth0_sub IS NOT NULL;
