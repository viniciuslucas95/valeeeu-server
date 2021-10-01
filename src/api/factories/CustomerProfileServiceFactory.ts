import { DatabaseConnection } from '../dataTypes/types';
import { PoolProvider } from '../providers';
import { CustomerProfileRepositoryPostgresql } from '../repositories/customerProfileRepository';
import { CustomerProfileService } from '../services';

export class CustomerProfileServiceFactory {
  static create(connection: DatabaseConnection = PoolProvider.pool) {
    const repository = new CustomerProfileRepositoryPostgresql(connection);
    return new CustomerProfileService(repository);
  }
}
