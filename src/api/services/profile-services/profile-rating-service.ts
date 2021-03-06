import { IProfileRatingDto } from '../../entities/dtos/profile-dtos';
import { InvalidRequestError } from '../../errors';
import { IProfileRatingRepository } from '../../repositories/interfaces/profile/profile-rating-repository';
import { RatingValidator } from '../../validators';
import { BaseChildService } from '../base-child-service';

interface IProfileRatingCreationData extends IProfileRatingDto {
  profileId: string;
}

interface IProfileRatingUpdateData extends Partial<IProfileRatingDto> {
  profileId: string;
}

export class ProfileRatingService extends BaseChildService {
  constructor(private readonly repository: IProfileRatingRepository) {
    super(repository, new InvalidRequestError('ProfileRatingNotFound'));
  }

  async createAsync(data: IProfileRatingCreationData): Promise<string> {
    const { rating, comment, profileId } = data;
    const { newId, currentDate } = await this.generateNewBaseModelData();
    await this.repository.createAsync({
      id: newId,
      rating: this.getValidatedRating(rating),
      comment: this.getValidatedComment(comment),
      profileId,
      createdAt: currentDate,
      updatedAt: currentDate,
    });
    return newId;
  }

  async updateAsync(id: string, data: IProfileRatingUpdateData) {
    const { profileId, comment, rating } = data;
    const result = await this.repository.getByIdAndParentIdAsync(id, profileId);
    if (!result) throw this.notFoundError;
    await this.repository.updateAsync(id, {
      rating: rating ? this.getValidatedRating(rating) : result.rating,
      comment: comment ? this.getValidatedComment(comment) : result.comment,
      updatedAt: this.getCurrentDate(),
    });
  }

  async deleteAsync(id: string, parentId: string) {
    await this.validateExistenceByIdAndParentIdAsync(id, parentId);
    await this.repository.deleteAsync(id);
  }

  private getValidatedRating(value: number) {
    RatingValidator.validate(value);
    return value;
  }

  private getValidatedComment(value: string) {
    return value;
  }
}
