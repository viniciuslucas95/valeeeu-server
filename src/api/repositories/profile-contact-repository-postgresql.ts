import { DatabaseConnection, Id } from '../data-types/types';
import { IDateDto, IProfileContactDataDto } from '../entities/dtos';
import { ProfileContact } from '../entities/models';
import { RepositoryPostgresql } from './repository-postgresql';
import { IProfileContactRepository } from './interfaces';

export class ProfileContactRepositoryPostgresql
  extends RepositoryPostgresql
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

  async updateAsync(
    id: Id,
    data: Omit<IProfileContactDataDto, 'profileId'> &
      Omit<IDateDto, 'createdAt'>
  ): Promise<void> {
    const { plataform, contact, updatedAt } = data;
    const query = `UPDATE ${this.tableName} SET plataform = $1, contact = $2, updated_at = $3 WHERE id = $4;`;
    await this.connection.query(query, [plataform, contact, updatedAt, id]);
  }

  async deleteAsync(id: Id): Promise<void> {
    const query = `DELETE FROM ${this.tableName} WHERE id = $1;`;
    await this.connection.query(query, [id]);
  }

  async getProfileContactAsync(
    id: Id,
    profileId?: Id
  ): Promise<Omit<IProfileContactDataDto, 'accountId'> | undefined> {
    const condition = profileId
      ? 'WHERE id = $1 AND profile_id = $2'
      : 'WHERE id = $1';
    const query = `SELECT plataform, contact FROM ${this.tableName} ${condition};`;
    const values = profileId ? [id, profileId] : [id];
    const { rows } = await this.connection.query<
      Omit<IProfileContactDataDto, 'accountId'>
    >(query, values);
    return rows[0] ?? undefined;
  }

  //   async getAllProfilesAsync(): Promise<IProfileDataDto[]> {
  //     const query = `SELECT id, name FROM ${this.tableName};`;
  //     const { rows } = await this.connection.query<IProfileDataDto>(query);
  //     return rows;
  //   }

  //   async checkExistenceAndRelationshipAsync(
  //     id: Id,
  //     accountId: Id
  //   ): Promise<boolean> {
  //     const query = `SELECT id FROM ${this.tableName} WHERE id = $1 AND account_id = $2;`;
  //     const { rows } = await this.connection.query(query, [id, accountId]);
  //     return rows[0] ? true : false;
  //   }

  //   async checkExistenceByAccountIdAsync(accountId: Id): Promise<boolean> {
  //     const query = `SELECT account_id FROM ${this.tableName} WHERE account_id = $1;`;
  //     const { rows } = await this.connection.query(query, [accountId]);
  //     return rows[0] ? true : false;
  //   }
}
