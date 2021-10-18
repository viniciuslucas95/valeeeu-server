import { Id } from '../../data-types/types';
import { IDateDto, IProfileDataDto } from '../../entities/dtos';
import { Profile } from '../../entities/models';
import { IBaseRepository } from './base-repository';

export interface IProfileRepository extends IBaseRepository {
  createAsync(data: Profile): Promise<void>;
  updateAsync(
    id: Id,
    data: Omit<IProfileDataDto, 'accountId'> & Omit<IDateDto, 'createdAt'>
  ): Promise<void>;
  deleteAsync(id: Id): Promise<void>;
  getProfileAsync(id: Id): Promise<IProfileDataDto | undefined>;
  getAllProfilesAsync(): Promise<IProfileDataDto[]>;
  getProfileByIdsAsync(
    id: Id,
    accountId: Id
  ): Promise<IProfileDataDto | undefined>;
  checkExistenceAndRelationshipAsync(id: Id, accountId: Id): Promise<boolean>;
  checkExistenceByAccountIdAsync(accountId: Id): Promise<boolean>;
}
