ALTER TABLE reservations
    ADD COLUMN IF NOT EXISTS auth0_sub VARCHAR(255);

CREATE INDEX IF NOT EXISTS reservations_auth0_sub_idx
    ON reservations (auth0_sub);
