import { DatabaseConnection } from '../../data-types/types';
import { PoolProvider } from '../../providers';
import { ProfilePictureRepositoryPostgresql } from '../../repositories/profile-repositories';
import { ProfilePictureService } from '../../services/profile-services';

export class ProfilePictureServiceFactory {
  static create(connection: DatabaseConnection = PoolProvider.pool) {
    const repository = new ProfilePictureRepositoryPostgresql(connection);
    return new ProfilePictureService(repository);
  }
}
