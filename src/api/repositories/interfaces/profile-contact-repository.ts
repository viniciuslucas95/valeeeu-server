import { Id } from '../../data-types/types';
import { IDateDto, IProfileContactDataDto } from '../../entities/dtos';
import { ProfileContact } from '../../entities/models';

export interface IProfileContactRepository {
  createAsync(data: ProfileContact): Promise<void>;
  updateAsync(
    id: Id,
    data: Omit<IProfileContactDataDto, 'profileId'> &
      Omit<IDateDto, 'createdAt'>
  ): Promise<void>;
  deleteAsync(id: Id): Promise<void>;
  getProfileContactAsync(
    id: Id,
    profileId?: Id
  ): Promise<Omit<IProfileContactDataDto, 'profileId'> | undefined>;
  //   getProfileAsync(id: Id): Promise<IProfileDataDto | undefined>;
  //   getAllProfilesAsync(): Promise<IProfileDataDto[]>;
  //   getProfileByIdsAsync(
  //     id: Id,
  //     accountId: Id
  //   ): Promise<IProfileDataDto | undefined>;
  //   checkExistenceAndRelationshipAsync(id: Id, accountId: Id): Promise<boolean>;
  //   checkExistenceByAccountIdAsync(accountId: Id): Promise<boolean>;
}
