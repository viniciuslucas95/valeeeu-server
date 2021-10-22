import { DatabaseConnection } from '../../data-types/types';
import { PoolProvider } from '../../providers';
import { ServiceProfileRepositoryPostgresql } from '../../repositories/service-profile-repositores';
import { ServiceProfileService } from '../../services/service-profile-services';

export class ServiceProfileServiceFactory {
  static create(connection: DatabaseConnection = PoolProvider.pool) {
    const repository = new ServiceProfileRepositoryPostgresql(connection);
    return new ServiceProfileService(repository);
  }
}
