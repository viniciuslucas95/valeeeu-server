import { IBaseRepository } from '.';
import { Id } from '../../data-types/types';
import { IAccountCredentialsDto, IDateDto } from '../../entities/dtos';
import { Account } from '../../entities/models';

export interface IAccountRepository extends IBaseRepository {
  createAsync(data: Account): Promise<void>;
  updateAsync(
    id: Id,
    data: IAccountCredentialsDto & Omit<IDateDto, 'createdAt'>
  ): Promise<void>;
  deleteAsync(id: Id): Promise<void>;
  getCredentialsByIdAsync(id: Id): Promise<IAccountCredentialsDto | undefined>;
  getEmailByIdAsync(
    id: Id
  ): Promise<Omit<IAccountCredentialsDto, 'password'> | undefined>;
  checkExistanceByEmailAsync(email: string): Promise<boolean>;
}
