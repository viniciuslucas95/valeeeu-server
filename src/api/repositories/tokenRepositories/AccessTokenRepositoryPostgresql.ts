import {
  ITokenReadByEmailResultDto,
  ITokenForbiddenAllResultDto,
} from '../../entities/dtos/token';
import { AccessToken } from '../../entities/models/tokens';
import { ITokenRepository } from './interfaces';
import { BaseRepositoryPostgresql } from '../bases';

export class AccessTokenRepositoryPostgresql
  extends BaseRepositoryPostgresql
  implements ITokenRepository<AccessToken>
{
  async createAsync(data: AccessToken) {
    const { id, createdAt, updatedAt, token, isForbidden, refreshTokenId } =
      data;
    const query =
      'INSERT INTO "access_token" (id, token, is_forbidden, refresh_token_id, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6);';
    await this.connection.query(query, [
      id,
      token,
      isForbidden,
      refreshTokenId,
      createdAt,
      updatedAt,
    ]);
  }

  async findByTokenAsync(
    token: string
  ): Promise<ITokenReadByEmailResultDto | undefined> {
    const query = 'SELECT id, is_forbidden FROM access_token WHERE token = $1;';
    const { rows } = await this.connection.query(query, [token]);
    const result = rows[0];
    return result
      ? {
          id: result.id,
          isForbidden: result.is_forbidden,
        }
      : undefined;
  }

  async forbidAllTokens(
    refreshTokenId: string
  ): Promise<ITokenForbiddenAllResultDto[]> {
    const query =
      'UPDATE access_token SET is_forbidden = true WHERE refresh_token_id = $1 AND is_forbidden = false RETURNING id;';
    const { rows } = await this.connection.query<ITokenForbiddenAllResultDto>(
      query,
      [refreshTokenId]
    );
    return rows;
  }

  async findByIdAsync(id: string): Promise<boolean> {
    const query = 'SELECT id FROM "access_token" WHERE id = $1;';
    const { rows } = await this.connection.query(query, [id]);
    return rows[0] ? true : false;
  }

  async checkExistanceByTokenAsync(token: string): Promise<boolean> {
    const query = 'SELECT token FROM access_token WHERE token = $1;';
    const { rows } = await this.connection.query(query, [token]);
    return rows[0] ? true : false;
  }

  async checkExistanceByIdAsync(id: string) {
    const query = 'SELECT id FROM access_token WHERE id = $1;';
    const { rows } = await this.connection.query(query, [id]);
    return rows[0] ? true : false;
  }
}
