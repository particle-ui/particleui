CREATE UNIQUE INDEX IF NOT EXISTS "team_members_team_id_user_id_unique"
ON "team_members" ("team_id", "user_id");
