import { PathConstant } from '../../../configs/constants';
import { WorkerProfileImageRepositoryDisk } from '../../repositories/workerProfileImageRepositories';
import { WorkerProfileImageDiskService } from '../../services/workerProfileImageServices';

export class WorkerProfileImageDiskServiceFactory {
  static create() {
    const repository = new WorkerProfileImageRepositoryDisk(
      PathConstant.imageStoragePath
    );
    return new WorkerProfileImageDiskService(repository);
  }
}
