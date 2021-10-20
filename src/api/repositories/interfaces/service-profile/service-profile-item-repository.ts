import { IServiceProfileItemDto } from '../../../entities/dtos/service-profile-dtos';
import { ServiceProfileItem } from '../../../entities/models/service-profile';
import { IReadRepository, IWriteRepository } from '../base-repository';
import { IReadParentRepository } from '../parent-repository';

export interface IServiceProfileItemUpdateDto extends IServiceProfileItemDto {
  updatedAt: Date;
}

export interface IServiceProfileItemMultipleResultsDto {
  id: string;
}

export interface IServiceProfileItemRepository
  extends IReadServiceProfileItemRepository,
    IWriteServiceProfileItemRepository {}

export interface IReadServiceProfileItemRepository
  extends IReadRepository<
      IServiceProfileItemDto,
      IServiceProfileItemMultipleResultsDto
    >,
    IReadParentRepository<
      IServiceProfileItemDto,
      IServiceProfileItemMultipleResultsDto
    > {}

export interface IWriteServiceProfileItemRepository
  extends IWriteRepository<ServiceProfileItem, IServiceProfileItemUpdateDto> {}
