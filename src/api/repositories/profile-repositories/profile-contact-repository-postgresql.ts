import { DatabaseConnection } from '../../data-types/types';
import { IProfileContactDto } from '../../entities/dtos/profile-dtos';
import { ProfileContact } from '../../entities/models/profile/profile-contact';
import { BaseRepositoryPostgresql } from '../base-repository-postgresql';
import {
  IIProfileContactMultipleResultsDto,
  IProfileContactRepository,
  IProfileContactUpdateDto,
} from '../interfaces/profile/profile-contact-repository';

export class ProfileContactRepositoryPostgresql
  extends BaseRepositoryPostgresql
  implements IProfileContactRepository
{
  constructor(connection: DatabaseConnection) {
    super(connection, 'profile_contact');
  }

  async createAsync(data: ProfileContact): Promise<void> {
    const { id, plataform, contact, profileId, createdAt, updatedAt } = data;
    const query = `INSERT INTO ${this.tableName} (id, plataform, contact, profile_id, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6);`;
    await this.connection.query(query, [
      id,
      plataform,
      contact,
      profileId,
      createdAt,
      updatedAt,
    ]);
  }

  async updateAsync(id: string, data: IProfileContactUpdateDto): Promise<void> {
    const { plataform, contact, updatedAt } = data;
    const query = `UPDATE ${this.tableName} SET plataform = $1, contact = $2, updated_at = $3 WHERE id = $4`;
    await this.connection.query(query, [plataform, contact, updatedAt, id]);
  }

  async deleteAsync(id: string): Promise<void> {
    const query = `DELETE FROM ${this.tableName} WHERE id = $1`;
    await this.connection.query(query, [id]);
  }

  async getAsync(id: string): Promise<IProfileContactDto | undefined> {
    const query = `SELECT plataform, contact FROM ${this.tableName} WHERE id = $1`;
    const { rows } = await this.connection.query(query, [id]);
    return rows[0] ?? undefined;
  }

  async getByIdAndParentIdAsync(
    id: string,
    parentId: string
  ): Promise<IProfileContactDto | undefined> {
    const query = `SELECT plataform, contact FROM ${this.tableName} WHERE id = $1 AND profile_id = $2`;
    const { rows } = await this.connection.query(query, [id, parentId]);
    return rows[0] ?? undefined;
  }

  async getAllAsync(): Promise<IIProfileContactMultipleResultsDto[]> {
    const query = `SELECT plataform, contact FROM ${this.tableName}`;
    const { rows } = await this.connection.query(query);
    return rows;
  }

  async getAllByParentIdAsync(
    parentId: string
  ): Promise<IIProfileContactMultipleResultsDto[]> {
    const query = `SELECT plataform, contact FROM ${this.tableName} WHERE profile_id = $1;`;
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
