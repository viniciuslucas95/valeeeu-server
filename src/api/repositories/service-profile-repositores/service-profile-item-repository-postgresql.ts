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
    const { id, price, item, serviceId, createdAt, updatedAt } = data;
    const query = `INSERT INTO ${this.tableName} (id, item, price, service_profile_id, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6);`;
    await this.connection.query(query, [
      id,
      item,
      price,
      serviceId,
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

  async getAsync(id: string): Promise<IServiceProfileItemDto | undefined> {
    const query = `SELECT item, price FROM ${this.tableName} WHERE id = $1 LIMIT 1`;
    const { rows } = await this.connection.query(query, [id]);
    return rows[0] ?? undefined;
  }

  async getByIdAndParentIdAsync(
    id: string,
    parentId: string
  ): Promise<IServiceProfileItemDto | undefined> {
    const query = `SELECT item, price FROM ${this.tableName} WHERE id = $1 AND service_profile_id = $2 LIMIT 1`;
    const { rows } = await this.connection.query(query, [id, parentId]);
    return rows[0] ?? undefined;
  }

  async getAllAsync(): Promise<IServiceProfileItemMultipleResultsDto[]> {
    const query = `SELECT id, item, price FROM ${this.tableName};`;
    const { rows } = await this.connection.query(query);
    return rows;
  }

  async getAllByParentIdAsync(
    parentId: string
  ): Promise<IServiceProfileItemMultipleResultsDto[]> {
    const query = `SELECT id, item, price FROM ${this.tableName} WHERE service_profile_id = $1;`;
    const { rows } = await this.connection.query(query, [parentId]);
    return rows;
  }

  async checkExistenceByParentIdAsync(parentId: string): Promise<boolean> {
    const query = `SELECT id FROM ${this.tableName} WHERE service_profile_id = $1 LIMIT 1`;
    const { rows } = await this.connection.query(query, [parentId]);
    return rows[0] ? true : false;
  }

  async checkExistenceByIdAndParentIdAsync(
    id: string,
    parentId: string
  ): Promise<boolean> {
    const query = `SELECT id FROM ${this.tableName} WHERE id = $1 AND service_profile_id = $2 LIMIT 1`;
    const { rows } = await this.connection.query(query, [id, parentId]);
    return rows[0] ? true : false;
  }
}
