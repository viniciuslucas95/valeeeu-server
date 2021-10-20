import { DatabaseConnection } from '../../data-types/types';
import { IServiceProfileItemDto } from '../../entities/dtos/service-profile-dtos';
import { ServiceProfileItem } from '../../entities/models/service-profile';
import { BaseRepositoryPostgresql } from '../base-repository-postgresql';
import {
  IServiceProfileItemMultipleResultsDto,
  IServiceProfileItemRepository,
  IServiceProfileItemUpdateDto,
} from '../interfaces/service-profile/service-profile-item-repository';

export class ServiceProfileItemRepositoryPostgresql
  extends BaseRepositoryPostgresql
  implements IServiceProfileItemRepository
{
  constructor(connection: DatabaseConnection) {
    super(connection, 'service_profile_item');
  }

  async createAsync(data: ServiceProfileItem): Promise<void> {
    const { id, price, item, profileId, createdAt, updatedAt } = data;
    const query = `INSERT INTO ${this.tableName} (id, item, price, profile_id, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6);`;
    await this.connection.query(query, [
      id,
      price,
      item,
      profileId,
      createdAt,
      updatedAt,
    ]);
  }

  async updateAsync(
    id: string,
    data: IServiceProfileItemUpdateDto
  ): Promise<void> {
    const { item, price, updatedAt } = data;
    const query = `UPDATE ${this.tableName} SET item = $1, price = $2, updated_at = $3 WHERE id = $4;`;
    await this.connection.query(query, [item, price, updatedAt, id]);
  }

  async deleteAsync(id: string): Promise<void> {
    const query = `DELETE FROM ${this.tableName} WHERE id = $1;`;
    await this.connection.query(query, [id]);
  }

  async getAsync(id: string): Promise<IServiceProfileItemDto | undefined> {
    const query = `SELECT item, price FROM ${this.tableName} WHERE id = $1`;
    const { rows } = await this.connection.query(query, [id]);
    return rows[0] ?? undefined;
  }

  async getByIdAndParentIdAsync(
    id: string,
    parentId: string
  ): Promise<IServiceProfileItemDto | undefined> {
    const query = `SELECT item, price FROM ${this.tableName} WHERE id = $1 AND profile_id = $2`;
    const { rows } = await this.connection.query(query, [id, parentId]);
    return rows[0] ?? undefined;
  }

  async getAllAsync(): Promise<IServiceProfileItemMultipleResultsDto[]> {
    const query = `SELECT id, item, price FROM ${this.tableName};`;
    const { rows } = await this.connection.query(query);
    return rows;
  }

  async checkExistenceAsync(id: string): Promise<boolean> {
    const query = `SELECT id FROM ${this.tableName} WHERE id = $1`;
    const { rows } = await this.connection.query(query, [id]);
    return rows[0] ? true : false;
  }

  async checkExistenceByParentIdAsync(parentId: string): Promise<boolean> {
    const query = `SELECT id FROM ${this.tableName} WHERE profile_id = $1`;
    const { rows } = await this.connection.query(query, [parentId]);
    return rows[0] ? true : false;
  }

  async checkExistenceByIdAndParentIdAsync(
    id: string,
    parentId: string
  ): Promise<boolean> {
    const query = `SELECT id FROM ${this.tableName} WHERE id = $1 AND profile_id = $2`;
    const { rows } = await this.connection.query(query, [id, parentId]);
    return rows[0] ? true : false;
  }
}
