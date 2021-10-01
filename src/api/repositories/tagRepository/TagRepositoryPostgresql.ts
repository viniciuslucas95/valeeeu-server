import { Tag } from '../../entities/models';
import { BaseRepositoryPostgresql } from '../BaseRepositoryPostgresql';
import { ITagRepository } from './interfaces';

export class TagRepositoryPostgresql
  extends BaseRepositoryPostgresql
  implements ITagRepository
{
  async createAsync(data: Tag) {
    const { id, name, workerProfileId, createdAt, updatedAt } = data;
    const query =
      'INSERT INTO tag (id, name, worker_profile_id, created_at, updated_at) VALUES ($1, $2, $3, $4, $5);';
    await this.connection.query(query, [
      id,
      name,
      workerProfileId,
      createdAt,
      updatedAt,
    ]);
  }

  async deleteAllTagsAsync(workerProfileId: string) {
    const query = 'DELETE FROM tag WHERE worker_profile_id = $1;';
    await this.connection.query(query, [workerProfileId]);
  }

  async checkExistanceByIdAsync(id: string) {
    const query = 'SELECT id FROM tag WHERE id = $1;';
    const { rows } = await this.connection.query(query, [id]);
    return rows[0] ? true : false;
  }
}
