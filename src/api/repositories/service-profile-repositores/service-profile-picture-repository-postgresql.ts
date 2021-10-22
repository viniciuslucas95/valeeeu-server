import { DatabaseConnection } from '../../data-types/types';
import { IServiceProfilePictureDto } from '../../entities/dtos/service-profile-dtos';
import { ServiceProfilePicture } from '../../entities/models/service-profile';
import { BaseRepositoryPostgresql } from '../base-repository-postgresql';
import {
  IServiceProfilePictureMultipleResultsDto,
  IServiceProfilePictureRepository,
  IServiceProfilePictureUpdateDto,
} from '../interfaces/service-profile/service-profile-picture-repository';

export class ServiceProfilePictureRepositoryPostgresql
  extends BaseRepositoryPostgresql
  implements IServiceProfilePictureRepository
{
  constructor(connection: DatabaseConnection) {
    super(connection, 'service_profile_picture');
  }

  async createAsync(data: ServiceProfilePicture): Promise<void> {
    const { id, picture, serviceId, createdAt, updatedAt } = data;
    const query = `INSERT INTO ${this.tableName} (id, picture, service_profile_id, created_at, updated_at) VALUES ($1, $2, $3, $4, $5);`;
    await this.connection.query(query, [
      id,
      picture,
      serviceId,
      createdAt,
      updatedAt,
    ]);
  }

  async updateAsync(
    id: string,
    data: IServiceProfilePictureUpdateDto
  ): Promise<void> {
    const { picture, updatedAt } = data;
    const query = `UPDATE ${this.tableName} SET picture = $1, updated_at = $2 WHERE id = $3;`;
    await this.connection.query(query, [picture, updatedAt, id]);
  }

  async deleteAsync(id: string): Promise<void> {
    const query = `DELETE FROM ${this.tableName} WHERE id = $1;`;
    await this.connection.query(query, [id]);
  }

  async getAsync(id: string): Promise<IServiceProfilePictureDto | undefined> {
    const query = `SELECT picture FROM ${this.tableName} WHERE id = $1 LIMIT 1`;
    const { rows } = await this.connection.query(query, [id]);
    return rows[0] ?? undefined;
  }

  async getByIdAndParentIdAsync(
    id: string,
    parentId: string
  ): Promise<IServiceProfilePictureDto | undefined> {
    const query = `SELECT picture FROM ${this.tableName} WHERE id = $1 AND service_profile_id = $2 LIMIT 1`;
    const { rows } = await this.connection.query(query, [id, parentId]);
    return rows[0] ?? undefined;
  }

  async getAllAsync(): Promise<IServiceProfilePictureMultipleResultsDto[]> {
    const query = `SELECT id, picture FROM ${this.tableName};`;
    const { rows } = await this.connection.query(query);
    return rows;
  }

  async getAllByParentIdAsync(
    parentId: string
  ): Promise<IServiceProfilePictureMultipleResultsDto[]> {
    const query = `SELECT id, picture FROM ${this.tableName} WHERE service_profile_id = $1;`;
    const { rows } = await this.connection.query(query, [parentId]);
    return rows;
  }

  async checkExistenceAsync(id: string): Promise<boolean> {
    const query = `SELECT id FROM ${this.tableName} WHERE id = $1 LIMIT 1`;
    const { rows } = await this.connection.query(query, [id]);
    return rows[0] ? true : false;
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
