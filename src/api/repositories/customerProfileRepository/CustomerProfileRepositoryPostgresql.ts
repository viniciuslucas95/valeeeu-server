import {
  ICustomerProfileReadByUserIdDto,
  ICustomerProfileUpdateDto,
} from '../../entities/dtos/customerProfile';
import { CustomerProfile } from '../../entities/models/profiles';
import { BaseRepositoryPostgresql } from '../BaseRepositoryPostgresql';
import { ICustomerProfileRepository } from './interfaces';

export class CustomerProfileRepositoryPostgresql
  extends BaseRepositoryPostgresql
  implements ICustomerProfileRepository
{
  async createAsync(data: CustomerProfile): Promise<void> {
    const { id, name, userId, createdAt, updatedAt } = data;
    const query =
      'INSERT INTO customer_profile (id, name, user_id, created_at, updated_at) VALUES ($1, $2, $3, $4, $5);';
    await this.connection.query(query, [
      id,
      name,
      userId,
      createdAt,
      updatedAt,
    ]);
  }

  async updateAsync(id: string, data: ICustomerProfileUpdateDto) {
    const { updatedAt, name } = data;
    const query =
      'UPDATE customer_profile SET name = $1, updated_at = $2 WHERE id = $3;';
    await this.connection.query(query, [name, updatedAt, id]);
  }

  async findByUserIdAsync(
    userId: string
  ): Promise<ICustomerProfileReadByUserIdDto | undefined> {
    const query = 'SELECT id, name FROM customer_profile WHERE user_id = $1;';
    const { rows } =
      await this.connection.query<ICustomerProfileReadByUserIdDto>(query, [
        userId,
      ]);
    return rows[0] ?? undefined;
  }

  async checkExistanceByUserIdAsync(userId: string) {
    const query = 'SELECT user_id FROM customer_profile WHERE user_id = $1;';
    const { rows } = await this.connection.query(query, [userId]);
    return rows[0] ? true : false;
  }

  async checkExistanceByIdAsync(id: string): Promise<boolean> {
    const query = 'SELECT id FROM customer_profile WHERE id = $1;';
    const { rows } = await this.connection.query(query, [id]);
    return rows[0] ? true : false;
  }
}
