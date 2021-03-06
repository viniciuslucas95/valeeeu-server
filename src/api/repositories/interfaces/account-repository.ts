import { IReadRepository, IWriteRepository } from './base-repository';
import { Account } from '../../entities/models';
import { IAccountDto } from '../../entities/dtos';

export interface IAccountUpdateDto extends IAccountDto {
  updatedAt: Date;
}

export interface IAccountReadByEmailDto {
  password: string;
  id: string;
}

export interface IAccountRepository
  extends IReadAccountRepository,
    IWriteAccountRepository {}

export interface IReadAccountRepository
  extends IReadRepository<Omit<IAccountDto, 'password'>, unknown> {
  getPrivilegedAsync(id: string): Promise<IAccountDto | undefined>;
  getByEmailAsync(email: string): Promise<IAccountReadByEmailDto | undefined>;
  checkExistenceByEmailAsync(email: string): Promise<boolean>;
}

export interface IWriteAccountRepository
  extends IWriteRepository<Account, IAccountUpdateDto> {}
