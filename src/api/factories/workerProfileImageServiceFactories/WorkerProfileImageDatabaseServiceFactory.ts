import { DatabaseConnection } from '../../dataTypes/types';
import { PoolProvider } from '../../providers';
import { WorkerProfileImageRepositoryPostgresql } from '../../repositories/workerProfileImageRepositories';
import { WorkerProfileImageDatabaseService } from '../../services/workerProfileImageServices';

export class WorkerProfileImageDatabaseServiceFactory {
  static create(connection: DatabaseConnection = PoolProvider.pool) {
    const repository = new WorkerProfileImageRepositoryPostgresql(connection);
    return new WorkerProfileImageDatabaseService(repository);
  }
}
