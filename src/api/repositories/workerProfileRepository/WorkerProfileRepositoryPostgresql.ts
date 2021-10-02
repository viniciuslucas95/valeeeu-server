import {
  IWorkerProfileReadByUserIdResultDto,
  IWorkerProfileUpdateDto,
} from '../../entities/dtos/workerProfile';
import { WorkerProfile } from '../../entities/models/profiles';
import { ServerError } from '../../errors';
import { BaseRepositoryPostgresql } from '../bases';
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

  async updateAsync(id: string, data: IWorkerProfileUpdateDto) {
    const { updatedAt, name, description, job } = data;
    const query =
      'UPDATE worker_profile SET name = $1, job = $2, description = $3, updated_at = $4 WHERE id = $5;';
    await this.connection.query(query, [name, job, description, updatedAt, id]);
  }

  async findByUserIdAsync<K extends keyof IWorkerProfileReadByUserIdResultDto>(
    userId: string,
    keys: K[]
  ): Promise<IWorkerProfileReadByUserIdResultDto | undefined> {
    const query = `SELECT ${this.formatSelectionKeys(
      keys
    )} FROM worker_profile WHERE user_id = $1;`;
    const { rows } =
      await this.connection.query<IWorkerProfileReadByUserIdResultDto>(query, [
        userId,
      ]);
    return rows[0] ?? undefined;
  }

  private formatSelectionKeys(keys: string[]) {
    if (keys.length === 0) throw new ServerError('NoKeySelected');
    let formatedQuery = '';
    const formatedKeys: string[] = [];
    for (let i = 0; i < keys.length; i++) {
      if (formatedKeys.includes(keys[i]))
        throw new ServerError('DuplicatedKeySelected');
      formatedQuery += keys[i];
      if (i < keys.length - 1) formatedQuery += ', ';
    }
    return formatedQuery;
  }

  async findByIdAsync(id: string): Promise<boolean> {
    const query = 'SELECT id FROM worker_profile WHERE id = $1;';
    const { rows } = await this.connection.query(query, [id]);
    return rows[0] ? true : false;
  }

  async checkExistanceByIdAsync(id: string) {
    const query = 'SELECT id FROM worker_profile WHERE id = $1;';
    const { rows } = await this.connection.query(query, [id]);
    return rows[0] ? true : false;
  }

  async checkExistanceByUserIdAsync(userId: string) {
    const query = 'SELECT user_id FROM worker_profile WHERE user_id = $1;';
    const { rows } = await this.connection.query(query, [userId]);
    return rows[0] ? true : false;
  }
}
