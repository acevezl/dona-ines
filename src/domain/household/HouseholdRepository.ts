import { Household } from "./Household";

export interface HouseholdRepository {
  create(household: Household): void;

  get(): Household | null;

  getById(id: string): Household | null;

  getByProfileIdAndHouseholdName(
    profileId: string,
    householdName: string,
  ): Household | null;

  update(household: Household): void;
}
