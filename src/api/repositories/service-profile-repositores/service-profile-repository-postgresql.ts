import { DatabaseConnection } from '../../data-types/types';
import { IServiceProfileDto } from '../../entities/dtos/service-profile-dtos';
import { ServiceProfile } from '../../entities/models/service-profile';
import { BaseRepositoryPostgresql } from '../base-repository-postgresql';
import {
  IServiceProfileMultipleResultsDto,
  IServiceProfileRepository,
  IServiceProfileUpdateDto,
} from '../interfaces/service-profile/service-profile-repository';

export class ServiceProfileRepositoryPostgresql
  extends BaseRepositoryPostgresql
  implements IServiceProfileRepository
{
  constructor(connection: DatabaseConnection) {
    super(connection, 'service_profile');
  }

  async createAsync(data: ServiceProfile): Promise<void> {
    const { id, description, profileId, createdAt, updatedAt } = data;
    const query = `INSERT INTO ${this.tableName} (id, description, profile_id, created_at, updated_at) VALUES ($1, $2, $3, $4, $5);`;
    await this.connection.query(query, [
      id,
      description,
      profileId,
      createdAt,
      updatedAt,
    ]);
  }

  async updateAsync(id: string, data: IServiceProfileUpdateDto): Promise<void> {
    const { description, updatedAt } = data;
    const query = `UPDATE ${this.tableName} SET description = $1, updated_at = $2 WHERE id = $3;`;
    await this.connection.query(query, [description, updatedAt, id]);
  }

  async getAsync(id: string): Promise<IServiceProfileDto | undefined> {
    const query = `SELECT description FROM ${this.tableName} WHERE id = $1 LIMIT 1`;
    const { rows } = await this.connection.query(query, [id]);
    return rows[0] ?? undefined;
  }

  async getByIdAndParentIdAsync(
    id: string,
    parentId: string
  ): Promise<IServiceProfileDto | undefined> {
    const query = `SELECT description FROM ${this.tableName} WHERE id = $1 AND profile_id = $2 LIMIT 1`;
    const { rows } = await this.connection.query(query, [id, parentId]);
    return rows[0] ?? undefined;
  }

  async getAllAsync(): Promise<IServiceProfileMultipleResultsDto[]> {
    const query = `SELECT id, profile_id FROM ${this.tableName};`;
    const { rows } = await this.connection.query(query);
    return rows.map((row) => {
      return {
        id: row.id,
        profileId: row.profile_id,
      };
    });
  }

  async getAllByParentIdAsync(
    parentId: string
  ): Promise<IServiceProfileMultipleResultsDto[]> {
    const query = `SELECT id, profile_id FROM ${this.tableName} WHERE profile_id = $1;`;
    const { rows } = await this.connection.query(query, [parentId]);
    return rows.map((row) => {
      return {
        id: row.id,
        profileId: row.profile_id,
      };
    });
  }

  async checkExistenceByParentIdAsync(parentId: string): Promise<boolean> {
    const query = `SELECT id FROM ${this.tableName} WHERE profile_id = $1 LIMIT 1`;
    const { rows } = await this.connection.query(query, [parentId]);
    return rows[0] ? true : false;
  }

  async checkExistenceByIdAndParentIdAsync(
    id: string,
    parentId: string
  ): Promise<boolean> {
    const query = `SELECT id FROM ${this.tableName} WHERE id = $1 AND profile_id = $2 LIMIT 1`;
    const { rows } = await this.connection.query(query, [id, parentId]);
    return rows[0] ? true : false;
  }
}
