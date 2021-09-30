import { DatabaseConnection } from '../dataTypes/types';
import { PoolProvider } from '../providers';
import { WorkerProfileRepositoryPostgresql } from '../repositories/workerProfileRepository';
import { WorkerProfileService } from '../services/WorkerProfileService';

export class WorkerProfileServiceFactory {
  static create(connection: DatabaseConnection = PoolProvider.pool) {
    const repository = new WorkerProfileRepositoryPostgresql(connection);
    return new WorkerProfileService(repository);
  }
}
