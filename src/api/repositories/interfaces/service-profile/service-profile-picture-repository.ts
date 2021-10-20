import { IServiceProfilePictureDto } from '../../../entities/dtos/service-profile-dtos';
import { ServiceProfilePicture } from '../../../entities/models/service-profile';
import { IReadRepository, IWriteRepository } from '../base-repository';
import { IReadParentRepository } from '../parent-repository';

export interface IServiceProfilePictureUpdateDto
  extends IServiceProfilePictureDto {
  updatedAt: Date;
}

export interface IServiceProfilePictureMultipleResultsDto {
  id: string;
}

export interface IServiceProfilePictureRepository
  extends IReadServiceProfilePictureRepository,
    IWriteServiceProfilePictureRepository {}

export interface IReadServiceProfilePictureRepository
  extends IReadRepository<
      IServiceProfilePictureDto,
      IServiceProfilePictureMultipleResultsDto
    >,
    IReadParentRepository<
      IServiceProfilePictureDto,
      IServiceProfilePictureMultipleResultsDto
    > {}

export interface IWriteServiceProfilePictureRepository
  extends IWriteRepository<
    ServiceProfilePicture,
    IServiceProfilePictureUpdateDto
  > {}
