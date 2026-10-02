import { Profile } from "./Profile";

export interface ProfileRepository {
  create(profile: Profile): void;
  get(): Profile | null;
  update(profile: Profile): void;
}
