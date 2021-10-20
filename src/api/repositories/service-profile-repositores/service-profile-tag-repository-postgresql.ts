import { DatabaseConnection } from '../../data-types/types';
import { IServiceProfileTagDto } from '../../entities/dtos/service-profile-dtos';
import { ServiceProfileTag } from '../../entities/models/service-profile';
import { BaseRepositoryPostgresql } from '../base-repository-postgresql';
import {
  IServiceProfileTagMultipleResultsDto,
  IServiceProfileTagRepository,
  IServiceProfileTagUpdateDto,
} from '../interfaces/service-profile/service-profile-tag-repository';

export class ServiceProfileTagRepositoryPostgresql
  extends BaseRepositoryPostgresql
  implements IServiceProfileTagRepository
{
  constructor(connection: DatabaseConnection) {
    super(connection, 'service_profile_tag');
  }

  async createAsync(data: ServiceProfileTag): Promise<void> {
    const { id, tag, serviceId, createdAt, updatedAt } = data;
    const query = `INSERT INTO ${this.tableName} (id, tag, service_profile_id, created_at, updated_at) VALUES ($1, $2, $3, $4, $5);`;
    await this.connection.query(query, [
      id,
      tag,
      serviceId,
      createdAt,
      updatedAt,
    ]);
  }

  async updateAsync(
    id: string,
    data: IServiceProfileTagUpdateDto
  ): Promise<void> {
    const { tag, updatedAt } = data;
    const query = `UPDATE ${this.tableName} SET tag = $1, updated_at = $2 WHERE id = $3;`;
    await this.connection.query(query, [tag, updatedAt, id]);
  }

  async deleteAsync(id: string): Promise<void> {
    const query = `DELETE FROM ${this.tableName} WHERE id = $1;`;
    await this.connection.query(query, [id]);
  }

  async getAsync(id: string): Promise<IServiceProfileTagDto | undefined> {
    const query = `SELECT tag FROM ${this.tableName} WHERE id = $1`;
    const { rows } = await this.connection.query(query, [id]);
    return rows[0] ?? undefined;
  }

  async getByIdAndParentIdAsync(
    id: string,
    parentId: string
  ): Promise<IServiceProfileTagDto | undefined> {
    const query = `SELECT tag FROM ${this.tableName} WHERE id = $1 AND service_profile_id = $2`;
    const { rows } = await this.connection.query(query, [id, parentId]);
    return rows[0] ?? undefined;
  }

  async getAllAsync(): Promise<IServiceProfileTagMultipleResultsDto[]> {
    const query = `SELECT id, tag FROM ${this.tableName};`;
    const { rows } = await this.connection.query(query);
    return rows;
  }

  async getAllByParentIdAsync(
    parentId: string
  ): Promise<IServiceProfileTagMultipleResultsDto[]> {
    const query = `SELECT id, tag FROM ${this.tableName} WHERE service_profile_id = $1;`;
    const { rows } = await this.connection.query(query, [parentId]);
    return rows;
  }

  async checkExistenceAsync(id: string): Promise<boolean> {
    const query = `SELECT id FROM ${this.tableName} WHERE id = $1`;
    const { rows } = await this.connection.query(query, [id]);
    return rows[0] ? true : false;
  }

  async checkExistenceByParentIdAsync(parentId: string): Promise<boolean> {
    const query = `SELECT id FROM ${this.tableName} WHERE service_profile_id = $1`;
    const { rows } = await this.connection.query(query, [parentId]);
    return rows[0] ? true : false;
  }

  async checkExistenceByIdAndParentIdAsync(
    id: string,
    parentId: string
  ): Promise<boolean> {
    const query = `SELECT id FROM ${this.tableName} WHERE id = $1 AND service_profile_id = $2`;
    const { rows } = await this.connection.query(query, [id, parentId]);
    return rows[0] ? true : false;
  }
}
