import {
  IUserCreationDto,
  IUserReadByEmailResultDto,
  IUserReadByIdResultDto,
  IUserUpdateDto,
} from '../../entities/dtos/user';
import { User } from '../../entities/models';
import { IUserRepository } from './interfaces';
import { BaseRepositoryPostgresql } from '../BaseRepositoryPostgresql';

export class UserRepositoryPostgresql
  extends BaseRepositoryPostgresql
  implements IUserRepository
{
  async createAsync(data: User) {
    const { id, email, password, createdAt, updatedAt } = data;
    const query =
      'INSERT INTO "user" (id, email, password, created_at, updated_at) VALUES ($1, $2, $3, $4, $5);';
    await this.connection.query(query, [
      id,
      email,
      password,
      createdAt,
      updatedAt,
    ]);
  }

  async updateAsync(id: string, data: IUserUpdateDto) {
    const { email, password, updatedAt } = data;
    const query =
      'UPDATE "user" SET email = $1, password = $2, updated_at = $3 WHERE id = $4;';
    await this.connection.query(query, [email, password, updatedAt, id]);
  }

  async deleteAsync(id: string) {
    const query = 'DELETE FROM "user" WHERE id = $1;';
    await this.connection.query(query, [id]);
  }

  async findByIdAsync(id: string): Promise<IUserReadByIdResultDto | undefined> {
    const query = 'SELECT email, password FROM "user" WHERE id = $1;';
    const { rows } = await this.connection.query<IUserReadByIdResultDto>(
      query,
      [id]
    );
    return rows[0] ?? undefined;
  }

  async findByEmailAsync(
    email: string
  ): Promise<IUserReadByEmailResultDto | undefined> {
    const query = 'SELECT id, password FROM "user" WHERE email = $1;';
    const { rows } = await this.connection.query<IUserReadByEmailResultDto>(
      query,
      [email]
    );
    return rows[0] ?? undefined;
  }

  async checkExistanceByIdAsync(id: string) {
    const query = 'SELECT id FROM "user" WHERE id = $1;';
    const { rows } = await this.connection.query(query, [id]);
    return rows[0] ? true : false;
  }

  async checkExistanceByEmailAsync(email: string) {
    const query = 'SELECT email FROM "user" WHERE email = $1;';
    const { rows } = await this.connection.query(query, [email]);
    return rows[0] ? true : false;
  }
}
