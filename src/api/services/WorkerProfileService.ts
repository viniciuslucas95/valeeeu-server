import {
  IWorkerProfileCreationDto,
  IWorkerProfileUpdateDto,
} from '../entities/dtos/workerProfile';
import { WorkerProfile } from '../entities/models/profiles';
import { ConflictError, InvalidRequestError } from '../errors';
import { IWorkerProfileRepository } from '../repositories/workerProfileRepository/interfaces';
import { BaseService } from './BaseService';

export class WorkerProfileService extends BaseService<WorkerProfile> {
  constructor(private readonly repository: IWorkerProfileRepository) {
    super(repository);
  }

  async createAsync(data: IWorkerProfileCreationDto) {
    const { job, name, userId, description } = data;
    const workerProfile = await this.repository.checkExistanceByUserIdAsync(
      userId
    );
    if (workerProfile) throw new ConflictError('WorkerProfileAlreadyCreated');
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
    await this.repository.createAsync(newWorkerProfile);
    return newId;
  }

  async updateAsync(
    userId: string,
    data: Omit<IWorkerProfileUpdateDto, 'updatedAt'>
  ) {
    const { name, job, description } = data;
    let updatedName = name ? name : undefined;
    let updatedJob = job ? job : undefined;
    let updatedDescription = description ? description : undefined;
    const workerProfile = await this.repository.findByUserIdAsync(userId);
    if (!workerProfile)
      throw new InvalidRequestError('WorkerProfileDoesNotExist');
    await this.repository.updateAsync(workerProfile.id, {
      name: updatedName ?? workerProfile.name,
      job: updatedJob ?? workerProfile.job,
      description: updatedDescription ?? workerProfile.description,
      updatedAt: this.getCurrentDate(),
    });
  }
}
