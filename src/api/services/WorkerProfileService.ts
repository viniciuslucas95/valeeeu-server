import { IWorkerProfileCreationDto } from '../entities/dtos/workerProfile';
import { WorkerProfile } from '../entities/models/profiles';
import { IWorkerProfileRepository } from '../repositories/workerProfileRepository/interfaces';
import { BaseService } from './BaseService';

export class WorkerProfileService extends BaseService<WorkerProfile> {
  constructor(
    private readonly workerProfileRepository: IWorkerProfileRepository
  ) {
    super(workerProfileRepository);
  }

  async createAsync(data: IWorkerProfileCreationDto) {
    const { job, name, userId, description } = data;
    const { newId, currentDate } = await this.generateBaseModel();
    const newWorkerProfile: WorkerProfile = {
      id: newId,
      name,
      job,
      userId,
      description,
      createdAt: currentDate,
      updatedAt: currentDate,
    };
    await this.workerProfileRepository.createAsync(newWorkerProfile);
    return newId;
  }
}
