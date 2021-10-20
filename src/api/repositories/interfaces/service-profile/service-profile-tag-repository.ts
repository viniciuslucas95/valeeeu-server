import { IServiceProfileTagDto } from '../../../entities/dtos/service-profile-dtos';
import { ServiceProfileTag } from '../../../entities/models/service-profile';
import { IReadRepository, IWriteRepository } from '../base-repository';
import { IReadParentRepository } from '../parent-repository';

export interface IServiceProfileTagUpdateDto extends IServiceProfileTagDto {
  updatedAt: Date;
}

export interface IServiceProfileTagMultipleResultsDto {
  id: string;
}

export interface IServiceProfileTagRepository
  extends IReadServiceProfileTagRepository,
    IWriteServiceProfileTagRepository {}

export interface IReadServiceProfileTagRepository
  extends IReadRepository<
      IServiceProfileTagDto,
      IServiceProfileTagMultipleResultsDto
    >,
    IReadParentRepository<IServiceProfileTagDto> {}

export interface IWriteServiceProfileTagRepository
  extends IWriteRepository<ServiceProfileTag, IServiceProfileTagUpdateDto> {}
