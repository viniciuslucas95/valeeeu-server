import { DatabaseConnection } from '../../data-types/types';
import { PoolProvider } from '../../providers';
import { ServiceProfileTagRepositoryPostgresql } from '../../repositories/service-profile-repositores';
import { ServiceProfileTagService } from '../../services/service-profile-services';

export class ServiceProfileTagServiceFactory {
  static create(connection: DatabaseConnection = PoolProvider.pool) {
    const repository = new ServiceProfileTagRepositoryPostgresql(connection);
    return new ServiceProfileTagService(repository);
  }
}
