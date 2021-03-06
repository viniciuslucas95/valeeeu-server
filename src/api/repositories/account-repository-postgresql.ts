import { DatabaseConnection } from '../data-types/types';
import { IAccountDto } from '../entities/dtos';
import { Account } from '../entities/models';
import { BaseRepositoryPostgresql } from './base-repository-postgresql';
import {
  IAccountReadByEmailDto,
  IAccountRepository,
  IAccountUpdateDto,
} from './interfaces/account-repository';

export class AccountRepositoryPostgresql
  extends BaseRepositoryPostgresql
  implements IAccountRepository
{
  constructor(connection: DatabaseConnection) {
    super(connection, 'account');
  }

  async createAsync(data: Account) {
    const { id, email, password, createdAt, updatedAt } = data;
    const query = `INSERT INTO ${this.tableName} (id, email, password, created_at, updated_at) VALUES ($1, $2, $3, $4, $5);`;
    await this.connection.query(query, [
      id,
      email,
      password,
      createdAt,
      updatedAt,
    ]);
  }

  async updateAsync(id: string, data: IAccountUpdateDto) {
    const { email, password, updatedAt } = data;
    const query = `UPDATE ${this.tableName} SET email = $1, password = $2, updated_at = $3 WHERE id = $4;`;
    await this.connection.query(query, [email, password, updatedAt, id]);
  }

  async getAsync(
    id: string
  ): Promise<Omit<IAccountDto, 'password'> | undefined> {
    const query = `SELECT email FROM ${this.tableName} WHERE id = $1 LIMIT 1;`;
    const { rows } = await this.connection.query(query, [id]);
    return rows[0] ?? undefined;
  }

  async getPrivilegedAsync(id: string): Promise<IAccountDto | undefined> {
    const query = `SELECT email, password FROM ${this.tableName} WHERE id = $1 LIMIT 1;`;
    const { rows } = await this.connection.query(query, [id]);
    return rows[0] ?? undefined;
  }

  async getByEmailAsync(
    email: string
  ): Promise<IAccountReadByEmailDto | undefined> {
    const query = `SELECT id, password FROM ${this.tableName} WHERE email = $1 LIMIT 1;`;
    const { rows } = await this.connection.query(query, [email]);
    return rows[0] ?? undefined;
  }

  async getAllAsync(): Promise<unknown[]> {
    console.warn('Trying to get all accounts');
    return [];
  }

  async checkExistenceByEmailAsync(email: string) {
    const query = `SELECT email FROM ${this.tableName} WHERE email = $1 LIMIT 1;`;
    const { rows } = await this.connection.query(query, [email]);
    return rows[0] ? true : false;
  }
}
