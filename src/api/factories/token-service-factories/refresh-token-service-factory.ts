import { DatabaseConnection } from '../../data-types/types';
import { PoolProvider } from '../../providers';
import { RefreshTokenRepositoryPostgresql } from '../../repositories/token-repositories';
import { RefreshTokenService } from '../../services/token-services';

export class RefreshTokenServiceFactory {
  static create(connection: DatabaseConnection = PoolProvider.pool) {
    const repository = new RefreshTokenRepositoryPostgresql(connection);
    return new RefreshTokenService(repository);
  }
}
