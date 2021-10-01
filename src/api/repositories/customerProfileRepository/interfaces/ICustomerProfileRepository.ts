import {
  ICustomerProfileReadByUserIdDto,
  ICustomerProfileUpdateDto,
} from '../../../entities/dtos/customerProfile';
import { CustomerProfile } from '../../../entities/models/profiles';
import { IRepository } from '../../interfaces';

export interface ICustomerProfileRepository
  extends IRepository<CustomerProfile> {
  checkExistanceByUserIdAsync(userId: string): Promise<boolean>;
  updateAsync(id: string, data: ICustomerProfileUpdateDto): Promise<void>;
  findByUserIdAsync(
    userId: string
  ): Promise<ICustomerProfileReadByUserIdDto | undefined>;
}
