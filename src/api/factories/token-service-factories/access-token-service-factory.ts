import { DatabaseConnection } from '../../data-types/types';
import { PoolProvider } from '../../providers';
import { AccessTokenRepositoryPostgresql } from '../../repositories/token-repositories';
import { AccessTokenService } from '../../services/token-services';

export class AccessTokenServiceFactory {
  static create(connection: DatabaseConnection = PoolProvider.pool) {
    const repository = new AccessTokenRepositoryPostgresql(connection);
    return new AccessTokenService(repository);
  }
}
