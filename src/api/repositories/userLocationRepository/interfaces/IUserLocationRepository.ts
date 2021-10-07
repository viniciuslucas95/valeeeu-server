import { IUserLocationUpdateDto } from '../../../entities/dtos/userLocation';
import { UserLocation } from '../../../entities/models';
import { IRepository } from '../../interfaces';

export interface IUserLocationRepository extends IRepository<UserLocation> {
  findByUserIdAsync(userId: string): Promise<UserLocation | undefined>;
  updateAsync(id: string, data: IUserLocationUpdateDto): Promise<void>;
}
