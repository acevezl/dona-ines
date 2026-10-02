import { Profile } from "@/domain/profile/Profile";
import { ProfileRepository } from "@/domain/profile/ProfileRepository";

import { database } from "./database";

export class SQLiteProfileRepository implements ProfileRepository {
  create(profile: Profile): void {
    database.runSync(
      `INSERT INTO profiles
            (id, profile_name, onboarding_completed, created_at, updated_at)
            VALUES (?, ?, ?, ?, ?)`,
      profile.id,
      profile.profileName,
      profile.onboardingCompleted ? 1 : 0,
      profile.createdAt,
      profile.updatedAt,
    );
  }

  get(): Profile | null {
    const row = database.getFirstSync<{
      id: string;
      profile_name: string;
      onboarding_completed: number;
      created_at: string;
      updated_at: string;
    }>("SELECT * FROM profiles LIMIT 1");

    if (!row) {
      return null;
    }

    return {
      id: row.id,
      profileName: row.profile_name,
      onboardingCompleted: row.onboarding_completed === 1,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    };
  }

  getByProfileName(profileName: string): Profile | null {
    const row = database.getFirstSync<{
      id: string;
      profile_name: string;
      onboarding_completed: number;
      created_at: string;
      updated_at: string;
    }>(
      `SELECT *
     FROM profiles
     WHERE profile_name = ?
     LIMIT 1`,
      profileName,
    );

    if (!row) {
      return null;
    }

    return {
      id: row.id,
      profileName: row.profile_name,
      onboardingCompleted: row.onboarding_completed === 1,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    };
  }

  update(profile: Profile): void {
    database.runSync(
      `UPDATE profiles
        SET profile_name = ?,
            onboarding_completed = ?,
            updated_at = ?
        WHERE id = ?`,
      profile.profileName,
      profile.onboardingCompleted ? 1 : 0,
      profile.updatedAt,
      profile.id,
    );
  }
}
