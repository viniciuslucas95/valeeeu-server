import { IUserLocationCreationDto } from '../entities/dtos/userLocation';
import { UserLocation } from '../entities/models';
import { IUserLocationRepository } from '../repositories/userLocationRepository/interfaces';
import { BaseService } from './BaseService';

export class UserLocationService extends BaseService<UserLocation> {
  constructor(private readonly repository: IUserLocationRepository) {
    super(repository);
  }

  async setLocationAsync(userId: string, data: IUserLocationCreationDto) {
    const { latitude, longitude } = data;
    const currentUserLocation = await this.repository.findByUserIdAsync(userId);
    if (!currentUserLocation) {
      const { newId, currentDate } = await this.generateBaseModel();
      const newUserLocation: UserLocation = {
        id: newId,
        latitude,
        longitude,
        userId,
        createdAt: currentDate,
        updatedAt: currentDate,
      };
      return await this.repository.createAsync(newUserLocation);
    }
    currentUserLocation.latitude = latitude;
    currentUserLocation.longitude = longitude;
    currentUserLocation.updatedAt = this.getCurrentDate();
    await this.repository.updateAsync(
      currentUserLocation.id,
      currentUserLocation
    );
  }
}
