import { ITokenDto } from '../../entities/dtos';
import { BaseRepositoryPostgresql } from '../base-repository-postgresql';
import {
  ITokenResultDto,
  ITokenUpdateDto,
} from '../interfaces/tokens/base-token-repository';

export class BaseTokenRepositoryPostgresql extends BaseRepositoryPostgresql {
  async updateAsync(id: string, data: ITokenUpdateDto): Promise<void> {
    const { isForbidden, updatedAt } = data;
    const query = `UPDATE ${this.tableName} SET is_forbidden = $1, updated_at = $2 WHERE id = $3;`;
    await this.connection.query(query, [isForbidden, updatedAt, id]);
  }

  async getAsync(id: string): Promise<ITokenDto | undefined> {
    console.warn('Trying to get token');
    return undefined;
  }

  async getByTokenAsync(token: string): Promise<ITokenResultDto | undefined> {
    const query = `SELECT id, is_forbidden as "isForbidden" FROM ${this.tableName} WHERE token = $1 LIMIT 1;`;
    const { rows } = await this.connection.query(query, [token]);
    return rows[0] ?? undefined;
  }

  async getAllAsync(): Promise<unknown[]> {
    console.warn('Trying to get all tokens');
    return [];
  }

  async checkExistenceByTokenAsync(token: string): Promise<boolean> {
    const query = `SELECT token FROM ${this.tableName} WHERE token = $1 LIMIT 1;`;
    const { rows } = await this.connection.query(query, [token]);
    return rows[0] ? true : false;
  }
}
