import { IServiceProfilePictureDto } from '../../entities/dtos/service-profile-dtos';
import { InvalidRequestError } from '../../errors';
import { IServiceProfilePictureRepository } from '../../repositories/interfaces/service-profile/service-profile-picture-repository';
import { PictureValidator } from '../../validators';
import { BaseChildService } from '../base-child-service';

interface IServiceProfilePictureData extends IServiceProfilePictureDto {
  serviceId: string;
}

export class ServiceProfilePictureService extends BaseChildService {
  constructor(private readonly repository: IServiceProfilePictureRepository) {
    super(repository, new InvalidRequestError('ServiceProfilePictureNotFound'));
  }

  async createAsync(data: IServiceProfilePictureData): Promise<string> {
    const { picture, serviceId: profileId } = data;
    const { newId, currentDate } = await this.generateNewBaseModelData();
    await this.repository.createAsync({
      id: newId,
      picture: this.getValidatedPicture(picture),
      profileId,
      createdAt: currentDate,
      updatedAt: currentDate,
    });
    return newId;
  }

  async updateAsync(id: string, data: IServiceProfilePictureData) {
    const { picture, serviceId: profileId } = data;
    const result = await this.repository.getByIdAndParentIdAsync(id, profileId);
    if (!result) throw this.notFoundError;
    await this.repository.updateAsync(id, {
      picture: picture ? this.getValidatedPicture(picture) : result.picture,
      updatedAt: this.getCurrentDate(),
    });
  }

  async deleteAsync(id: string, parentId: string) {
    await this.validateExistenceByIdAndParentIdAsync(id, parentId);
    await this.repository.deleteAsync(id);
  }

  private getValidatedPicture(value: string) {
    PictureValidator.validate(value);
    return value;
  }
}
