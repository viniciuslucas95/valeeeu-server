import { IProfileContactDto } from '../../../entities/dtos/profile-dtos';
import { ProfileContact } from '../../../entities/models/profile/profile-contact';
import { IReadRepository, IWriteRepository } from '../base-repository';
import { IReadParentRepository } from '../parent-repository';

export interface IProfileContactUpdateDto extends IProfileContactDto {
  updatedAt: Date;
}

export interface IIProfileContactMultipleResultsDto extends IProfileContactDto {
  id: string;
}

export interface IProfileContactRepository
  extends IProfileContactReadRepository,
    IProfileContactWriteRepository {}

export interface IProfileContactWriteRepository
  extends IWriteRepository<ProfileContact, IProfileContactUpdateDto> {}

export interface IProfileContactReadRepository
  extends IReadRepository<
      IProfileContactDto,
      IIProfileContactMultipleResultsDto
    >,
    IReadParentRepository<IProfileContactDto> {}
