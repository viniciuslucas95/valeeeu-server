import { Id } from '../data-types/types';
import { IAccountCredentialsDto, IDateDto } from '../entities/dtos';
import { Account } from '../entities/models';
import { BaseRepositoryPostgresql } from './base-repository-postgresql';
import { IAccountRepository } from './interfaces';

export class AccountRepositoryPostgresql
  extends BaseRepositoryPostgresql
  implements IAccountRepository
{
  async createAsync(data: Account) {
    const { id, email, password, createdAt, updatedAt } = data;
    const query =
      'INSERT INTO account (id, email, password, created_at, updated_at) VALUES ($1, $2, $3, $4, $5);';
    await this.connection.query(query, [
      id,
      email,
      password,
      createdAt,
      updatedAt,
    ]);
  }

  async updateAsync(
    id: Id,
    data: IAccountCredentialsDto & Omit<IDateDto, 'createdAt'>
  ) {
    const { email, password, updatedAt } = data;
    const query =
      'UPDATE account SET email = $1, password = $2, updated_at = $3 WHERE id = $4;';
    await this.connection.query(query, [email, password, updatedAt, id]);
  }

  async deleteAsync(id: Id) {
    const query = 'DELETE FROM account WHERE id = $1;';
    await this.connection.query(query, [id]);
  }

  async getCredentialsByIdAsync(
    id: Id
  ): Promise<IAccountCredentialsDto | undefined> {
    const query = 'SELECT email, password FROM account WHERE id = $1;';
    const { rows } = await this.connection.query<IAccountCredentialsDto>(
      query,
      [id]
    );
    return rows[0] ?? undefined;
  }

  async getEmailByIdAsync(
    id: Id
  ): Promise<Omit<IAccountCredentialsDto, 'password'> | undefined> {
    const query = 'SELECT email FROM account WHERE id = $1;';
    const { rows } = await this.connection.query<
      Omit<IAccountCredentialsDto, 'password'>
    >(query, [id]);
    return rows[0] ?? undefined;
  }

  async checkExistanceByIdAsync(id: Id) {
    const query = 'SELECT id FROM account WHERE id = $1;';
    const { rows } = await this.connection.query(query, [id]);
    return rows[0] ? true : false;
  }

  async checkExistanceByEmailAsync(email: string) {
    const query = 'SELECT email FROM account WHERE email = $1;';
    const { rows } = await this.connection.query(query, [email]);
    return rows[0] ? true : false;
  }
}
