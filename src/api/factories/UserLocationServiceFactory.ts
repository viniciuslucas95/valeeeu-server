import { DatabaseConnection } from '../dataTypes/types';
import { PoolProvider } from '../providers';
import { UserLocationRepositoryPostgresql } from '../repositories/userLocationRepository';
import { UserLocationService } from '../services/UserLocationService';

export class UserLocationServiceFactory {
  static create(connection: DatabaseConnection = PoolProvider.pool) {
    const repository = new UserLocationRepositoryPostgresql(connection);
    return new UserLocationService(repository);
  }
}
