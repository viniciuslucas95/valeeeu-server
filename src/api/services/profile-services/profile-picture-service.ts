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
    const profilePicture = await this.repository.getByIdAndParentIdAsync(
      id,
      profileId
    );
    if (!profilePicture) throw this.notFoundError;
    await this.repository.updateAsync(id, {
      picture: this.getValidatedPicture(picture),
      updatedAt: this.getCurrentDate(),
    });
  }

  async deleteAsync(id: string, profileId: string) {
    await this.validateExistenceByIdAndParentIdAsync(id, profileId);
    await this.repository.deleteAsync(id);
  }

  private getValidatedPicture(picture: string) {
    PictureValidator.validate(picture);
    return picture;
  }
}
