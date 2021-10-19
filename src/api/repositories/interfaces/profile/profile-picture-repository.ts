import { IProfilePictureDto } from '../../../entities/dtos/profile-dtos';
import { ProfilePicture } from '../../../entities/models/profile';
import { IReadRepository, IWriteRepository } from '../base-repository';
import { IReadParentRepository } from '../parent-repository';

export interface IIProfilePictureMultipleResultsDto extends IProfilePictureDto {
  id: string;
}

export interface IProfilePictureUpdateDto extends IProfilePictureDto {
  updatedAt: Date;
}

export interface IProfilePictureRepository
  extends IProfilePictureWriteRepository,
    IProfilePictureReadRepository {}

export interface IProfilePictureWriteRepository
  extends IWriteRepository<ProfilePicture, IProfilePictureUpdateDto> {}

export interface IProfilePictureReadRepository
  extends IReadRepository<
      IProfilePictureDto,
      IIProfilePictureMultipleResultsDto
    >,
    IReadParentRepository<IProfilePictureDto> {}
