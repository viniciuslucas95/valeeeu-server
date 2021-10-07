import { IUserLocationUpdateDto } from '../../entities/dtos/userLocation';
import { UserLocation } from '../../entities/models';
import { BaseRepositoryPostgresql } from '../bases';
import { IUserLocationRepository } from './interfaces';

export class UserLocationRepositoryPostgresql
  extends BaseRepositoryPostgresql
  implements IUserLocationRepository
{
  async createAsync(data: UserLocation): Promise<void> {
    const { id, latitude, longitude, userId, createdAt, updatedAt } = data;
    const query =
      'INSERT INTO user_location (id, latitude, longitude, user_id, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6);';
    await this.connection.query(query, [
      id,
      latitude,
      longitude,
      userId,
      createdAt,
      updatedAt,
    ]);
  }

  async updateAsync(id: string, data: IUserLocationUpdateDto): Promise<void> {
    const { latitude, longitude, updatedAt } = data;
    const query =
      'UPDATE user_location SET latitude = $1, longitude = $2, updated_at = $3 WHERE id = $4;';
    await this.connection.query(query, [latitude, longitude, updatedAt, id]);
  }

  async checkExistanceByIdAsync(id: string): Promise<boolean> {
    const query = 'SELECT id FROM user_location WHERE id = $1;';
    const { rows } = await this.connection.query(query, [id]);
    return rows[0] ? true : false;
  }

  async findByUserIdAsync(userId: string): Promise<UserLocation | undefined> {
    const query = 'SELECT * FROM user_location WHERE user_id = $1;';
    const { rows } = await this.connection.query<UserLocation>(query, [userId]);
    return rows[0];
  }
}
