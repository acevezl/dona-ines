import { HouseholdProfile } from "./HouseholdProfile";

export interface HouseholdProfileRepository {
  create(householdProfile: HouseholdProfile): void;
  getByProfileId(profileId: string): HouseholdProfile | null;
}
