import {
  IUserReadByEmailResultDto,
  IUserCreationDto,
  IUserUpdateDto,
} from '../../../entities/dtos/user';
import { User } from '../../../entities/models';
import { IRepository } from '../../interfaces';

export interface IUserRepository extends IRepository<User> {
  updateAsync(id: string, data: IUserUpdateDto): Promise<void>;
  deleteAsync(id: string): Promise<void>;
  findByIdAsync(id: string): Promise<IUserCreationDto | undefined>;
  findByEmailAsync(
    email: string
  ): Promise<IUserReadByEmailResultDto | undefined>;
  checkEmailExistenceAsync(email: string): Promise<boolean>;
}
