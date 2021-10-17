import { DatabaseConnection } from '../data-types/types';
import { PoolProvider } from '../providers';
import { AccountRepositoryPostgresql } from '../repositories';
import { AccountService } from '../services';

export class AccountServiceFactory {
  static create(connection: DatabaseConnection = PoolProvider.pool) {
    const repository = new AccountRepositoryPostgresql(connection);
    return new AccountService(repository);
  }
}
