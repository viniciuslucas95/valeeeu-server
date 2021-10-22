import { DatabaseConnection } from '../../data-types/types';
import { PoolProvider } from '../../providers';
import { ServiceProfilePictureRepositoryPostgresql } from '../../repositories/service-profile-repositores';
import { ServiceProfilePictureService } from '../../services/service-profile-services';

export class ServiceProfilePictureServiceFactory {
  static create(connection: DatabaseConnection = PoolProvider.pool) {
    const repository = new ServiceProfilePictureRepositoryPostgresql(
      connection
    );
    return new ServiceProfilePictureService(repository);
  }
}
