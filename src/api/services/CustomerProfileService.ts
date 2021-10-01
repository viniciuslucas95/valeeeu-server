import {
  ICustomerProfileCreationDto,
  ICustomerProfileUpdateDto,
} from '../entities/dtos/customerProfile';
import { CustomerProfile } from '../entities/models/profiles';
import { ConflictError, InvalidRequestError } from '../errors';
import { ICustomerProfileRepository } from '../repositories/customerProfileRepository/interfaces';
import { BaseService } from './BaseService';

export class CustomerProfileService extends BaseService<CustomerProfile> {
  constructor(private readonly repository: ICustomerProfileRepository) {
    super(repository);
  }

  async createAsync(data: ICustomerProfileCreationDto) {
    const { name, userId } = data;
    const customerProfile = await this.repository.checkExistanceByUserIdAsync(
      userId
    );
    if (customerProfile)
      throw new ConflictError('CustomerProfileAlreadyCreated');
    const { newId, currentDate } = await this.generateBaseModel();
    const newCustomerProfile: CustomerProfile = {
      id: newId,
      name,
      userId,
      createdAt: currentDate,
      updatedAt: currentDate,
    };
    await this.repository.createAsync(newCustomerProfile);
    return newId;
  }

  async updateAsync(
    userId: string,
    data: Omit<ICustomerProfileUpdateDto, 'updatedAt'>
  ) {
    const { name } = data;
    const customerProfile = await this.repository.findByUserIdAsync(userId);
    if (!customerProfile)
      throw new InvalidRequestError('CustomerProfileDoesNotExist');
    await this.repository.updateAsync(customerProfile.id, {
      name,
      updatedAt: this.getCurrentDate(),
    });
  }
}
