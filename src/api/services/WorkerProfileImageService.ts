import { ReadStream } from 'fs';
import { PipelineSource } from 'stream';
import { WorkerProfileImage } from '../entities/models/images';
import { WorkerProfileImageRepositoryDisk } from '../repositories/workerProfileImageRepository';
import { IWorkerProfileImageRepository } from '../repositories/workerProfileImageRepository/interfaces';
import { BaseService } from './BaseService';

export class WorkerProfileImageService extends BaseService<WorkerProfileImage> {
  constructor(
    private readonly databaseRepository: IWorkerProfileImageRepository,
    private readonly diskRepository: WorkerProfileImageRepositoryDisk
  ) {
    super(databaseRepository);
  }

  async createAsync(workerProfileId: string, data: PipelineSource<ReadStream>) {
    const { newId, currentDate } = await this.generateBaseModel();
    await this.databaseRepository.createAsync({
      id: newId,
      workerProfileId,
      createdAt: currentDate,
      updatedAt: currentDate,
    });
    await this.diskRepository.createAsync(workerProfileId, data);
  }
}
