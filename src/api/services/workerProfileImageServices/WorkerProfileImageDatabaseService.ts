import { WorkerProfileImage } from '../../entities/models/images';
import { IWorkerProfileImageRepository } from '../../repositories/workerProfileImageRepositories/interfaces';
import { BaseService } from '../BaseService';

export class WorkerProfileImageDatabaseService extends BaseService<WorkerProfileImage> {
  constructor(private readonly repository: IWorkerProfileImageRepository) {
    super(repository);
  }

  async createAsync(workerProfileId: string) {
    const { newId, currentDate } = await this.generateBaseModel();
    await this.repository.createAsync({
      id: newId,
      workerProfileId,
      createdAt: currentDate,
      updatedAt: currentDate,
    });
    return { id: newId };
  }
}
