import { PathConstant } from '../../configs/constants';
import { DatabaseConnection } from '../dataTypes/types';
import { PoolProvider } from '../providers';
import {
  WorkerProfileImageRepositoryDisk,
  WorkerProfileImageRepositoryPostgresql,
} from '../repositories/workerProfileImageRepository';
import { WorkerProfileImageService } from '../services';

export class WorkerProfileImageServiceFactory {
  static create(connection: DatabaseConnection = PoolProvider.pool) {
    const databaseRepository = new WorkerProfileImageRepositoryPostgresql(
      connection
    );
    const diskRepository = new WorkerProfileImageRepositoryDisk(
      PathConstant.imageStoragePath
    );
    return new WorkerProfileImageService(databaseRepository, diskRepository);
  }
}
