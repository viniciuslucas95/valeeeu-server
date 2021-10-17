import { Id } from '../data-types/types';
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

  async checkExistenceByIdAsync(id: Id) {
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
