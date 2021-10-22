import { IServiceProfileDto } from '../../entities/dtos/service-profile-dtos';
import { InvalidRequestError } from '../../errors';
import { IServiceProfileRepository } from '../../repositories/interfaces/service-profile/service-profile-repository';
import { BaseChildService } from '../base-child-service';

interface IServiceProfileData extends IServiceProfileDto {
  profileId: string;
}

export class ServiceProfileService extends BaseChildService {
  constructor(private readonly repository: IServiceProfileRepository) {
    super(repository, new InvalidRequestError('ServiceProfileNotFound'));
  }

  async createAsync(data: IServiceProfileData): Promise<string> {
    const { description, profileId } = data;
    const { newId, currentDate } = await this.generateNewBaseModelData();
    await this.repository.createAsync({
      id: newId,
      description,
      profileId,
      createdAt: currentDate,
      updatedAt: currentDate,
    });
    return newId;
  }

  async updateAsync(id: string, data: IServiceProfileData) {
    const { description, profileId } = data;
    const result = await this.repository.getByIdAndParentIdAsync(id, profileId);
    if (!result) throw this.notFoundError;
    await this.repository.updateAsync(id, {
      description,
      updatedAt: this.getCurrentDate(),
    });
  }

  async deleteAsync(id: string, parentId: string) {
    await this.validateExistenceByIdAndParentIdAsync(id, parentId);
    await this.repository.deleteAsync(id);
  }
}
