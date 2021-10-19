import { ProfileContact } from '../../entities/models/profile-contact';
import { IReadRepository, IWriteRepository } from './base-repository';
import { IReadParentRepository } from './parent-repository';

export interface IProfileContactUpdateDto {
  plataform: string;
  contact: string;
  updatedAt: Date;
}

export interface IIProfileContactSingleResultDto {
  plataform: string;
  contact: string;
}

export interface IIProfileContactMultipleResultsDto {
  id: string;
  plataform: string;
  contact: string;
}

export interface IProfileContactRepository
  extends IProfileContactReadRepository,
    IProfileContactWriteRepository {}

export interface IProfileContactWriteRepository
  extends IWriteRepository<ProfileContact, IProfileContactUpdateDto> {}

export interface IProfileContactReadRepository
  extends IReadRepository<
      IIProfileContactSingleResultDto,
      IIProfileContactMultipleResultsDto
    >,
    IReadParentRepository<IIProfileContactSingleResultDto> {}
