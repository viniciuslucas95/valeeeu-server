import { DatabaseConnection } from '../data-types/types';
import { Profile } from '../entities/models';
import { BaseRepositoryPostgresql } from './base-repository-postgresql';
import {
  IIProfileMultipleResultsDto,
  IIProfileSingleResultDto,
  IProfileRepository,
  IProfileUpdateDto,
} from './interfaces';

export class ProfileRepositoryPostgresql
  extends BaseRepositoryPostgresql
  implements IProfileRepository
{
  constructor(connection: DatabaseConnection) {
    super(connection, 'profile');
  }

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

  async updateAsync(id: string, data: IProfileUpdateDto): Promise<void> {
    const { name, updatedAt } = data;
    const query = `UPDATE ${this.tableName} SET name = $1, updated_at = $2 WHERE id = $3;`;
    await this.connection.query(query, [name, updatedAt, id]);
  }

  async deleteAsync(id: string): Promise<void> {
    const query = `DELETE FROM ${this.tableName} WHERE id = $1;`;
    await this.connection.query(query, [id]);
  }

  async getAsync(id: string): Promise<IIProfileSingleResultDto | undefined> {
    const query = `SELECT name FROM ${this.tableName} WHERE id = $1`;
    const { rows } = await this.connection.query<IIProfileSingleResultDto>(
      query,
      [id]
    );
    return rows[0] ?? undefined;
  }

  async getByIdAndParentIdAsync(
    id: string,
    parentId: string
  ): Promise<IIProfileSingleResultDto> {
    const query = `SELECT name FROM ${this.tableName} WHERE id = $1 AND account_id = $2`;
    const { rows } = await this.connection.query<IIProfileSingleResultDto>(
      query,
      [id, parentId]
    );
    return rows[0] ?? undefined;
  }

  async getAllAsync(): Promise<IIProfileMultipleResultsDto[] | undefined> {
    const query = `SELECT id, name FROM ${this.tableName};`;
    const { rows } = await this.connection.query<IIProfileMultipleResultsDto>(
      query
    );
    return rows;
  }

  async checkExistenceAsync(id: string): Promise<boolean> {
    const query = `SELECT id FROM ${this.tableName} WHERE id = $1`;
    const { rows } = await this.connection.query(query, [id]);
    return rows[0] ? true : false;
  }

  async checkExistenceByParentIdAsync(parentId: string): Promise<boolean> {
    const query = `SELECT id FROM ${this.tableName} WHERE account_id = $1`;
    const { rows } = await this.connection.query(query, [parentId]);
    return rows[0] ? true : false;
  }

  async checkExistenceByIdAndParentIdAsync(
    id: string,
    parentId: string
  ): Promise<boolean> {
    const query = `SELECT id FROM ${this.tableName} WHERE id = $1 AND account_id = $2`;
    const { rows } = await this.connection.query(query, [id, parentId]);
    return rows[0] ? true : false;
  }
}
