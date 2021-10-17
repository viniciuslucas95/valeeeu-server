import { IBaseRepository } from '.';
import { Account } from '../../entities/models';

export interface IAccountRepository extends IBaseRepository {
  createAsync(data: Account): Promise<void>;
  checkExistanceByEmailAsync(email: string): Promise<boolean>;
}
