import { HouseholdProfile } from "@/domain/household/HouseholdProfile";
import { HouseholdProfileRepository } from "@/domain/household/HouseholdProfileRepository";

import { database } from "./database";

export class SQLiteHouseholdProfileRepository implements HouseholdProfileRepository {
  create(householdProfile: HouseholdProfile): void {
    database.runSync(
      `INSERT INTO household_profiles
        (household_id, profile_id)
       VALUES (?, ?)`,
      householdProfile.householdId,
      householdProfile.profileId,
    );
  }

  getByProfileId(profileId: string): HouseholdProfile | null {
    const row = database.getFirstSync<{
      household_id: string;
      profile_id: string;
    }>(
      `SELECT household_id, profile_id
     FROM household_profiles
     WHERE profile_id = ?
     LIMIT 1`,
      profileId,
    );

    if (!row) {
      return null;
    }

    return {
      householdId: row.household_id,
      profileId: row.profile_id,
    };
  }
}
