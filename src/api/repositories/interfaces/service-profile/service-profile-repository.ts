import { IServiceProfileDto } from '../../../entities/dtos/service-profile-dtos';
import { ServiceProfile } from '../../../entities/models/service-profile';
import { IReadRepository, IWriteRepository } from '../base-repository';
import { IReadParentRepository } from '../parent-repository';

export interface IServiceProfileUpdateDto extends IServiceProfileDto {
  updatedAt: Date;
}

export interface IServiceProfileMultipleResultsDto {
  id: string;
  profileId: string;
}

export interface IServiceProfileRepository
  extends IReadServiceProfileRepository,
    IWriteServiceProfileRepository {}

export interface IReadServiceProfileRepository
  extends IReadRepository<
      IServiceProfileDto,
      IServiceProfileMultipleResultsDto
    >,
    IReadParentRepository<IServiceProfileDto> {}

export interface IWriteServiceProfileRepository
  extends IWriteRepository<ServiceProfile, IServiceProfileUpdateDto> {}
