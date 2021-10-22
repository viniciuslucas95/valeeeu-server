import { DatabaseConnection } from '../../data-types/types';
import { IProfileRatingDto } from '../../entities/dtos/profile-dtos';
import { ProfileRating } from '../../entities/models/profile';
import { BaseRepositoryPostgresql } from '../base-repository-postgresql';
import {
  IIProfileRatingMultipleResultsDto,
  IIProfileRatingSingleResultDto,
  IProfileRatingRepository,
  IProfileRatingUpdateDto,
} from '../interfaces/profile/profile-rating-repository';

export class ProfileRatingRepositoryPostgresql
  extends BaseRepositoryPostgresql
  implements IProfileRatingRepository
{
  constructor(connection: DatabaseConnection) {
    super(connection, 'profile_rating');
  }

  async createAsync(data: ProfileRating): Promise<void> {
    const { id, rating, comment, profileId, createdAt, updatedAt } = data;
    const query = `INSERT INTO ${this.tableName} (id, rating, comment, profile_id, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6);`;
    await this.connection.query(query, [
      id,
      rating,
      comment,
      profileId,
      createdAt,
      updatedAt,
    ]);
  }

  async updateAsync(id: string, data: IProfileRatingUpdateDto): Promise<void> {
    const { rating, comment, updatedAt } = data;
    const query = `UPDATE ${this.tableName} SET rating = $1, comment = $2, updated_at = $3 WHERE id = $4`;
    await this.connection.query(query, [rating, comment, updatedAt, id]);
  }

  async getAsync(
    id: string
  ): Promise<IIProfileRatingSingleResultDto | undefined> {
    const query = `SELECT rating, comment, updated_at FROM ${this.tableName} WHERE id = $1 LIMIT 1`;
    const { rows } = await this.connection.query(query, [id]);
    const profileRating = rows[0];
    return profileRating
      ? {
          rating: profileRating.rating,
          comment: profileRating.comment,
          date: profileRating.updated_at,
        }
      : undefined;
  }

  async getByIdAndParentIdAsync(
    id: string,
    parentId: string
  ): Promise<IIProfileRatingSingleResultDto | undefined> {
    const query = `SELECT rating, comment, updated_at FROM ${this.tableName} WHERE id = $1 AND profile_id = $2 LIMIT 1`;
    const { rows } = await this.connection.query(query, [id, parentId]);
    const profileRating = rows[0];
    return profileRating
      ? {
          rating: profileRating.rating,
          comment: profileRating.comment,
          date: profileRating.updated_at,
        }
      : undefined;
  }

  async getAllAsync(): Promise<IIProfileRatingMultipleResultsDto[]> {
    const query = `SELECT id, rating, comment, updated_at FROM ${this.tableName}`;
    const { rows } = await this.connection.query(query);
    return rows.map((row) => {
      return {
        id: row.id,
        rating: row.rating,
        comment: row.comment,
        date: row.updated_at,
      };
    });
  }

  async getAllByParentIdAsync(
    parentId: string
  ): Promise<IIProfileRatingMultipleResultsDto[]> {
    const query = `SELECT id, rating, comment, updated_at FROM ${this.tableName} WHERE profile_id = $1;`;
    const { rows } = await this.connection.query(query, [parentId]);
    return rows;
  }

  async checkExistenceByParentIdAsync(parentId: string): Promise<boolean> {
    const query = `SELECT profile_id FROM ${this.tableName} WHERE profile_id = $1 LIMIT 1`;
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
