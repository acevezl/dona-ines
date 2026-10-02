import { Household } from "@/domain/household/Household";
import { HouseholdRepository } from "@/domain/household/HouseholdRepository";

import { database } from "./database";

export class SQLiteHouseholdRepository implements HouseholdRepository {
  getByProfileAndHouseholdName(profileId: string, householdName: string): Household | null {
    throw new Error("Method not implemented.");
  }
  create(household: Household): void {
    database.runSync(
      `INSERT INTO households
      (id, household_name, created_at, updated_at)
     VALUES (?, ?, ?, ?)`,
      household.id,
      household.householdName,
      household.createdAt,
      household.updatedAt,
    );
  }

  get(): Household | null {
    const row = database.getFirstSync<{
      id: string;
      household_name: string;
      created_at: string;
      updated_at: string;
    }>("SELECT * FROM households LIMIT 1");

    if (!row) {
      return null;
    }

    return {
      id: row.id,
      householdName: row.household_name,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    };
  }

  getById(id: string): Household | null {
    const row = database.getFirstSync<{
      id: string;
      household_name: string;
      created_at: string;
      updated_at: string;
    }>(
      `SELECT *
     FROM households
     WHERE id = ?
     LIMIT 1`,
      id,
    );

    if (!row) {
      return null;
    }

    return {
      id: row.id,
      householdName: row.household_name,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    };
  }

  getByProfileIdAndHouseholdName(
    profileId: string,
    householdName: string,
  ): Household | null {
    const row = database.getFirstSync<{
      id: string;
      household_name: string;
      created_at: string;
      updated_at: string;
    }>(
      `SELECT h.*
     FROM households h
     INNER JOIN household_profiles hp
       ON hp.household_id = h.id
     WHERE hp.profile_id = ?
       AND h.household_name = ?
     LIMIT 1`,
      profileId,
      householdName,
    );

    if (!row) {
      return null;
    }

    return {
      id: row.id,
      householdName: row.household_name,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    };
  }

  update(household: Household): void {
    database.runSync(
      `UPDATE households
            SET name = ?,
            updated_at = ?
        WHERE id = ?`,
      household.householdName,
      household.updatedAt,
      household.id,
    );
  }
}
