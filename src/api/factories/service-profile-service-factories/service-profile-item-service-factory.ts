import { DatabaseConnection } from '../../data-types/types';
import { PoolProvider } from '../../providers';
import { ServiceProfileItemRepositoryPostgresql } from '../../repositories/service-profile-repositores';
import { ServiceProfileItemService } from '../../services/service-profile-services';

export class ServiceProfileItemServiceFactory {
  static create(connection: DatabaseConnection = PoolProvider.pool) {
    const repository = new ServiceProfileItemRepositoryPostgresql(connection);
    return new ServiceProfileItemService(repository);
  }
}
