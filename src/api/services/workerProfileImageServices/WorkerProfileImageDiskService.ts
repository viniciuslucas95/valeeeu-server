import { ReadStream } from 'fs';
import { PipelineSource } from 'stream';
import { WorkerProfileImageRepositoryDisk } from '../../repositories/workerProfileImageRepositories';

export class WorkerProfileImageDiskService {
  constructor(private readonly repository: WorkerProfileImageRepositoryDisk) {}

  async createAsync(workerProfileId: string, data: PipelineSource<ReadStream>) {
    await this.repository.createAsync(workerProfileId, data);
  }
}
