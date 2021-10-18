import { IReadRepository, IWriteRepository } from '.';
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
  extends Omit<IReadRepository<IAccountResultDto, unknown>, 'getAllAsync'> {
  getPrivilegedAsync(
    id: string
  ): Promise<IAccountPrivilegedResultDto | undefined>;
  checkExistenceByEmailAsync(email: string): Promise<boolean>;
}

export interface IWriteAccountRepository
  extends IWriteRepository<Account, IAccountUpdateDto> {}
