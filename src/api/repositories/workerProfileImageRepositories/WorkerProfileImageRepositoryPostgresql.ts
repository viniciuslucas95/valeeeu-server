import { WorkerProfileImage } from '../../entities/models/images';
import { BaseRepositoryPostgresql } from '../bases';
import { IWorkerProfileImageRepository } from './interfaces';

export class WorkerProfileImageRepositoryPostgresql
  extends BaseRepositoryPostgresql
  implements IWorkerProfileImageRepository
{
  async createAsync(data: WorkerProfileImage): Promise<void> {
    const { createdAt, workerProfileId, updatedAt, id } = data;
    const query =
      'INSERT INTO worker_profile_image (id, worker_profile_id, created_at, updated_at) VALUES ($1, $2, $3, $4);';
    await this.connection.query(query, [
      id,
      workerProfileId,
      createdAt,
      updatedAt,
    ]);
  }

  async checkExistanceByIdAsync(id: string): Promise<boolean> {
    const query = 'SELECT id FROM worker_profile_image WHERE id = $1;';
    const { rows } = await this.connection.query(query, [id]);
    return rows[0] ? true : false;
  }
}
