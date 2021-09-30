import { PoolProvider } from '../providers';
import { AccessTokenRepositoryPostgresql } from '../repositories/tokenRepositories';
import { AccessTokenService } from '../services/tokenServices';
import { DatabaseConnection } from '../types';

export class AccessTokenServiceFactory {
  static create(connection: DatabaseConnection = PoolProvider.pool) {
    const repository = new AccessTokenRepositoryPostgresql(connection);
    return new AccessTokenService(repository);
  }
}
