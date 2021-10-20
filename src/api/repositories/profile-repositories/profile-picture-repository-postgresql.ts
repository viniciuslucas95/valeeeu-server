import { DatabaseConnection } from '../../data-types/types';
import { IProfilePictureDto } from '../../entities/dtos/profile-dtos';
import { ProfilePicture } from '../../entities/models/profile';
import { BaseRepositoryPostgresql } from '../base-repository-postgresql';
import {
  IIProfilePictureMultipleResultsDto,
  IProfilePictureRepository,
  IProfilePictureUpdateDto,
} from '../interfaces/profile/profile-picture-repository';

export class ProfilePictureRepositoryPostgresql
  extends BaseRepositoryPostgresql
  implements IProfilePictureRepository
{
  constructor(connection: DatabaseConnection) {
    super(connection, 'profile_picture');
  }

  async createAsync(data: ProfilePicture): Promise<void> {
    const { id, picture, profileId, createdAt, updatedAt } = data;
    const query = `INSERT INTO ${this.tableName} (id, picture, profile_id, created_at, updated_at) VALUES ($1, $2, $3, $4, $5);`;
    await this.connection.query(query, [
      id,
      picture,
      profileId,
      createdAt,
      updatedAt,
    ]);
  }

  async updateAsync(id: string, data: IProfilePictureUpdateDto): Promise<void> {
    const { picture, updatedAt } = data;
    const query = `UPDATE ${this.tableName} SET picture = $1, updated_at = $2 WHERE id = $3`;
    await this.connection.query(query, [picture, updatedAt, id]);
  }

  async deleteAsync(id: string): Promise<void> {
    const query = `DELETE FROM ${this.tableName} WHERE id = $1`;
    await this.connection.query(query, [id]);
  }

  async getAsync(id: string): Promise<IProfilePictureDto | undefined> {
    const query = `SELECT picture FROM ${this.tableName} WHERE id = $1`;
    const { rows } = await this.connection.query(query, [id]);
    return rows[0] ?? undefined;
  }

  async getByIdAndParentIdAsync(
    id: string,
    parentId: string
  ): Promise<IProfilePictureDto | undefined> {
    const query = `SELECT picture FROM ${this.tableName} WHERE id = $1 AND profile_id = $2`;
    const { rows } = await this.connection.query(query, [id, parentId]);
    return rows[0] ?? undefined;
  }

  async getAllAsync(): Promise<IIProfilePictureMultipleResultsDto[]> {
    const query = `SELECT id, picture FROM ${this.tableName}`;
    const { rows } = await this.connection.query(query);
    return rows;
  }

  async getAllByParentIdAsync(
    parentId: string
  ): Promise<IIProfilePictureMultipleResultsDto[]> {
    const query = `SELECT id, picture FROM ${this.tableName} WHERE profile_id = $1;`;
    const { rows } = await this.connection.query(query, [parentId]);
    return rows;
  }

  async checkExistenceAsync(id: string): Promise<boolean> {
    const query = `SELECT id FROM ${this.tableName} WHERE id = $1`;
    const { rows } = await this.connection.query(query, [id]);
    return rows[0] ? true : false;
  }

  async checkExistenceByParentIdAsync(parentId: string): Promise<boolean> {
    const query = `SELECT profile_id FROM ${this.tableName} WHERE profile_id = $1`;
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
