import { IProfilePictureDto } from '../../entities/dtos/profile-dtos';
import { InvalidRequestError } from '../../errors';
import { IProfilePictureRepository } from '../../repositories/interfaces/profile/profile-picture-repository';
import { PictureValidator } from '../../validators';
import { BaseChildService } from '../base-child-service';

interface IProfilePictureData extends IProfilePictureDto {
  profileId: string;
}

export class ProfilePictureService extends BaseChildService {
  constructor(private readonly repository: IProfilePictureRepository) {
    super(repository, new InvalidRequestError('ProfilePictureNotFound'));
  }

  async createAsync(data: IProfilePictureData): Promise<string> {
    const { picture, profileId } = data;
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

  async updateAsync(id: string, data: IProfilePictureData) {
    const { profileId, picture } = data;
    const result = await this.repository.getByIdAndParentIdAsync(id, profileId);
    if (!result) throw this.notFoundError;
    await this.repository.updateAsync(id, {
      picture: this.getValidatedPicture(picture),
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
