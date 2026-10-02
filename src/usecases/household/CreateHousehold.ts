import { Household } from "@/domain/household/Household";
import { HouseholdProfileRepository } from "@/domain/household/HouseholdProfileRepository";
import { HouseholdRepository } from "@/domain/household/HouseholdRepository";
import { TransactionManager } from "@/domain/TransactionManager";

export class CreateHousehold {
  constructor(
    private householdRepository: HouseholdRepository,
    private householdProfileRepository: HouseholdProfileRepository,
    private transactionManager: TransactionManager,
  ) {}

  execute(household: Household, profileId: string): Household {
    const existingHousehold =
      this.householdRepository.getByProfileIdAndHouseholdName(
        profileId,
        household.householdName,
      );

    if (existingHousehold) {
      return existingHousehold;
    }

    this.transactionManager.run(() => {
      this.householdRepository.create(household);

      this.householdProfileRepository.create({
        householdId: household.id,
        profileId,
      });
    });

    return household;
  }
}
