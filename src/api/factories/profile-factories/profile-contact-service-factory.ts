import { DatabaseConnection } from '../../data-types/types';
import { PoolProvider } from '../../providers';
import { ProfileContactRepositoryPostgresql } from '../../repositories/profile-repositories';
import { ProfileContactService } from '../../services/profile-services';

export class ProfileContactServiceFactory {
  static create(connection: DatabaseConnection = PoolProvider.pool) {
    const repository = new ProfileContactRepositoryPostgresql(connection);
    return new ProfileContactService(repository);
  }
}
