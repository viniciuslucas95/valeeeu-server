import { IProfileRatingDto } from '../../../entities/dtos/profile-dtos';
import { ProfileRating } from '../../../entities/models/profile';
import { IReadRepository, IWriteRepository } from '../base-repository';
import { IReadParentRepository } from '../parent-repository';

export interface IIProfileRatingSingleResultDto extends IProfileRatingDto {
  date: Date;
}

export interface IIProfileRatingMultipleResultsDto extends IProfileRatingDto {
  id: string;
  date: Date;
}

export interface IProfileRatingUpdateDto extends IProfileRatingDto {
  updatedAt: Date;
}

export interface IProfileRatingRepository
  extends IProfileRatingWriteRepository,
    IProfileRatingReadRepository {}

export interface IProfileRatingWriteRepository
  extends IWriteRepository<ProfileRating, IProfileRatingUpdateDto> {}

export interface IProfileRatingReadRepository
  extends IReadRepository<
      IIProfileRatingSingleResultDto,
      IIProfileRatingMultipleResultsDto
    >,
    IReadParentRepository<IIProfileRatingSingleResultDto> {}
