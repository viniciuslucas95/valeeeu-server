import { DatabaseConnection } from '../../data-types/types';
import { RefreshToken } from '../../entities/models/tokens';
import { IRefreshTokenRepository } from '../interfaces/tokens/refresh-token-repository';
import { ITokenForbiddanceResultDto } from '../interfaces/tokens/base-token-repository';
import { BaseTokenRepositoryPostgresql } from './base-token-repository-postgresql';

export class RefreshTokenRepositoryPostgresql
  extends BaseTokenRepositoryPostgresql
  implements IRefreshTokenRepository
{
  constructor(connection: DatabaseConnection) {
    super(connection, 'refresh_token');
  }

  async createAsync(data: RefreshToken): Promise<void> {
    const { id, accountId, isForbidden, token, createdAt, updatedAt } = data;
    const query = `INSERT INTO ${this.tableName} (id, token, is_forbidden, account_id, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6);`;
    await this.connection.query(query, [
      id,
      token,
      isForbidden,
      accountId,
      createdAt,
      updatedAt,
    ]);
  }

  async forbidAllTokensAsync(
    parentId: string,
    currentDate: Date
  ): Promise<ITokenForbiddanceResultDto[]> {
    const query = `UPDATE ${this.tableName} SET is_forbidden = true, updated_at = $1 WHERE account_id = $2 RETURNING id;`;
    const { rows } = await this.connection.query(query, [
      currentDate,
      parentId,
    ]);
    return rows;
  }
}
