import { IReadParentRepository, IWriteRepository } from '.';
import { Profile } from '../../entities/models';
import { IReadRepository } from './base-repository';

export interface IIProfileSingleResultDto {
  name: string;
}

export interface IIProfileMultipleResultsDto {
  id: string;
  name: string;
}

export interface IProfileUpdateDto {
  name: string;
  updatedAt: Date;
}

export interface IProfileRepository
  extends IReadProfileRepository,
    IWriteProfileRepository {}

export interface IWriteProfileRepository
  extends IWriteRepository<Profile, IProfileUpdateDto> {}

export interface IReadProfileRepository
  extends IReadRepository<
      IIProfileSingleResultDto,
      IIProfileMultipleResultsDto
    >,
    IReadParentRepository<IIProfileSingleResultDto> {}
