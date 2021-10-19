import { IProfileDto } from '../../../entities/dtos/profile-dtos';
import { Profile } from '../../../entities/models/profile';
import { IReadRepository, IWriteRepository } from '../base-repository';
import { IReadParentRepository } from '../parent-repository';

export interface IIProfileMultipleResultsDto extends IProfileDto {
  id: string;
}

export interface IProfileUpdateDto extends IProfileDto {
  updatedAt: Date;
}

export interface IProfileRepository
  extends IReadProfileRepository,
    IWriteProfileRepository {}

export interface IWriteProfileRepository
  extends IWriteRepository<Profile, IProfileUpdateDto> {}

export interface IReadProfileRepository
  extends IReadRepository<IProfileDto, IIProfileMultipleResultsDto>,
    IReadParentRepository<IProfileDto> {}
