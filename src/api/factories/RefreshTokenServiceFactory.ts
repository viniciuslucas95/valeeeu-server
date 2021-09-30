import { PoolProvider } from '../providers';
import { RefreshTokenRepositoryPostgresql } from '../repositories/tokenRepositories';
import { RefreshTokenService } from '../services/tokenServices';
import { DatabaseConnection } from '../types';

export class RefreshTokenServiceFactory {
  static create(connection: DatabaseConnection = PoolProvider.pool) {
    const repository = new RefreshTokenRepositoryPostgresql(connection);
    return new RefreshTokenService(repository);
  }
}
