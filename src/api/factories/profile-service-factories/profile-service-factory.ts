import { DatabaseConnection } from '../../data-types/types';
import { PoolProvider } from '../../providers';
import { ProfileRepositoryPostgresql } from '../../repositories/profile-repositories';
import { ProfileService } from '../../services/profile-services';

export class ProfileServiceFactory {
  static create(connection: DatabaseConnection = PoolProvider.pool) {
    const repository = new ProfileRepositoryPostgresql(connection);
    return new ProfileService(repository);
  }
}
