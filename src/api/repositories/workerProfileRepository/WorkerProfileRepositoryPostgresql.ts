import { WorkerProfile } from '../../entities/models/profiles';
import { BaseRepositoryPostgresql } from '../BaseRepositoryPostgresql';
import { IWorkerProfileRepository } from './interfaces';

export class WorkerProfileRepositoryPostgresql
  extends BaseRepositoryPostgresql
  implements IWorkerProfileRepository
{
  async createAsync(data: WorkerProfile) {
    const { id, name, job, description, userId, createdAt, updatedAt } = data;
    const query =
      'INSERT INTO worker_profile (id, name, job, description, user_id, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6, $7);';
    await this.connection.query(query, [
      id,
      name,
      job,
      description,
      userId,
      createdAt,
      updatedAt,
    ]);
  }

  async checkIdExistenceAsync(id: string): Promise<boolean> {
    const query = 'SELECT id FROM worker_profile WHERE id = $1;';
    const { rows } = await this.connection.query(query, [id]);
    return rows[0] ? true : false;
  }
}
