import { Id } from '../data-types/types';
import { IProfileDataDto, IDateDto } from '../entities/dtos';
import { Profile } from '../entities/models';
import { BaseRepositoryPostgresql } from './base-repository-postgresql';
import { IProfileRepository } from './interfaces';

export class ProfileRepositoryPostgresql
  extends BaseRepositoryPostgresql
  implements IProfileRepository
{
  private readonly tableName = 'profile';

  async createAsync(data: Profile): Promise<void> {
    const { id, name, accountId, createdAt, updatedAt } = data;
    const query = `INSERT INTO ${this.tableName} (id, name, account_id, created_at, updated_at) VALUES ($1, $2, $3, $4, $5);`;
    await this.connection.query(query, [
      id,
      name,
      accountId,
      createdAt,
      updatedAt,
    ]);
  }

  async updateAsync(
    id: string,
    data: Omit<IProfileDataDto, 'accountId'> & Omit<IDateDto, 'createdAt'>
  ): Promise<void> {
    const { name, updatedAt } = data;
    const query = `UPDATE ${this.tableName} SET name = $1, updated_at = $2 WHERE id = $3;`;
    await this.connection.query(query, [name, updatedAt, id]);
  }

  async deleteAsync(id: string): Promise<void> {
    const query = `DELETE FROM ${this.tableName} WHERE id = $1;`;
    await this.connection.query(query, [id]);
  }

  async getProfileAsync(id: Id): Promise<IProfileDataDto | undefined> {
    const query = `SELECT name FROM ${this.tableName} WHERE id = $1;`;
    const { rows } = await this.connection.query<IProfileDataDto>(query, [id]);
    return rows[0] ?? undefined;
  }

  async getProfileByIdsAsync(
    id: Id,
    accountId: Id
  ): Promise<IProfileDataDto | undefined> {
    const query = `SELECT name FROM ${this.tableName} WHERE id = $1 AND account_id = $2`;
    const { rows } = await this.connection.query<IProfileDataDto>(query, [
      id,
      accountId,
    ]);
    return rows[0] ?? undefined;
  }

  async getAllProfilesAsync(): Promise<IProfileDataDto[]> {
    const query = `SELECT id, name FROM ${this.tableName};`;
    const { rows } = await this.connection.query<IProfileDataDto>(query);
    return rows;
  }

  async checkExistenceByIdAsync(id: Id): Promise<boolean> {
    const query = `SELECT id FROM ${this.tableName} WHERE id = $1;`;
    const { rows } = await this.connection.query(query, [id]);
    return rows[0] ? true : false;
  }

  async checkExistenceAndRelationshipAsync(
    id: Id,
    accountId: Id
  ): Promise<boolean> {
    const query = `SELECT id FROM ${this.tableName} WHERE id = $1 AND account_id = $2;`;
    const { rows } = await this.connection.query(query, [id, accountId]);
    return rows[0] ? true : false;
  }

  async checkExistenceByAccountIdAsync(accountId: Id): Promise<boolean> {
    const query = `SELECT account_id FROM ${this.tableName} WHERE account_id = $1;`;
    const { rows } = await this.connection.query(query, [accountId]);
    return rows[0] ? true : false;
  }
}
