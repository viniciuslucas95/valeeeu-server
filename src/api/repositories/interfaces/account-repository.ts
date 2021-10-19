import { IReadRepository, IWriteRepository } from './base-repository';
import { Account } from '../../entities/models';

export interface IAccountResultDto {
  email: string;
}

export interface IAccountPrivilegedResultDto {
  email: string;
  password: string;
}

export interface IAccountUpdateDto {
  email: string;
  password: string;
  updatedAt: Date;
}

export interface IAccountRepository
  extends IReadAccountRepository,
    IWriteAccountRepository {}

export interface IReadAccountRepository
  extends IReadRepository<IAccountResultDto, unknown> {
  getPrivilegedAsync(
    id: string
  ): Promise<IAccountPrivilegedResultDto | undefined>;
  checkExistenceByEmailAsync(email: string): Promise<boolean>;
}

export interface IWriteAccountRepository
  extends IWriteRepository<Account, IAccountUpdateDto> {}
