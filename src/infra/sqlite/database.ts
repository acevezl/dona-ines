import * as SQLite from "expo-sqlite";
// SQLite.deleteDatabaseSync("dona-ines.db");
export const database = SQLite.openDatabaseSync("dona-ines.db");

export function initializeDatabase() {
  database.execSync(`
    PRAGMA journal_mode = WAL;

    CREATE TABLE IF NOT EXISTS profiles (
      id TEXT PRIMARY KEY NOT NULL,
      profile_name TEXT NOT NULL,
      onboarding_completed INTEGER NOT NULL DEFAULT 0,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS households (
      id TEXT PRIMARY KEY NOT NULL,
      household_name TEXT NOT NULL,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );
    
    CREATE TABLE IF NOT EXISTS household_profiles (
      household_id TEXT NOT NULL,
      profile_id TEXT NOT NULL UNIQUE,

      PRIMARY KEY (household_id, profile_id),

      FOREIGN KEY (household_id) REFERENCES households(id),
      FOREIGN KEY (profile_id) REFERENCES profiles(id)
    );  
    
  `);
}
