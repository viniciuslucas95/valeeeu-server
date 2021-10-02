import {
  IWorkerProfileReadByUserIdResultDto,
  IWorkerProfileUpdateDto,
} from '../../../entities/dtos/workerProfile';
import { WorkerProfile } from '../../../entities/models/profiles';
import { IRepository } from '../../interfaces';

export interface IWorkerProfileRepository extends IRepository<WorkerProfile> {
  findByUserIdAsync<K extends keyof IWorkerProfileReadByUserIdResultDto>(
    userId: string,
    keys: K[]
  ): Promise<IWorkerProfileReadByUserIdResultDto | undefined>;
  updateAsync(id: string, data: IWorkerProfileUpdateDto): Promise<void>;
  checkExistanceByUserIdAsync(userId: string): Promise<boolean>;
}
