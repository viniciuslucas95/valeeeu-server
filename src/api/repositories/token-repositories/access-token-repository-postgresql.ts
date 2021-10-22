import { DatabaseConnection } from '../../data-types/types';
import { AccessToken } from '../../entities/models/tokens';
import { IAccessTokenRepository } from '../interfaces/tokens/access-token-repository';
import { ITokenForbiddanceResultDto } from '../interfaces/tokens/base-token-repository';
import { BaseTokenRepositoryPostgresql } from './base-token-repository-postgresql';

export class AccessTokenRepositoryPostgresql
  extends BaseTokenRepositoryPostgresql
  implements IAccessTokenRepository
{
  constructor(connection: DatabaseConnection) {
    super(connection, 'access_token');
  }

  async createAsync(data: AccessToken): Promise<void> {
    const { id, refreshTokenId, isForbidden, token, createdAt, updatedAt } =
      data;
    const query = `INSERT INTO ${this.tableName} (id, token, is_forbidden, refresh_token_id, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6);`;
    await this.connection.query(query, [
      id,
      token,
      isForbidden,
      refreshTokenId,
      createdAt,
      updatedAt,
    ]);
  }

  async forbidAllTokensAsync(
    parentId: string,
    currentDate: Date
  ): Promise<ITokenForbiddanceResultDto[]> {
    const query = `UPDATE ${this.tableName} SET is_forbidden = true, updated_at = $1 WHERE refresh_token_id = $2 RETURNING id;`;
    const { rows } = await this.connection.query(query, [
      currentDate,
      parentId,
    ]);
    return rows;
  }
}
