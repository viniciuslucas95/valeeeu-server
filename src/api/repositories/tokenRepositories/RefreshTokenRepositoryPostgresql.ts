import {
  ITokenReadByEmailResultDto,
  ITokenForbiddenAllResultDto,
} from '../../entities/dtos/token';
import { RefreshToken } from '../../entities/models/tokens';
import { ITokenRepository } from './interfaces';
import { BaseRepositoryPostgresql } from '../BaseRepositoryPostgresql';

export class RefreshTokenRepositoryPostgresql
  extends BaseRepositoryPostgresql
  implements ITokenRepository<RefreshToken>
{
  async createAsync(data: RefreshToken) {
    const { id, createdAt, updatedAt, token, isForbidden, userId } = data;
    const query =
      'INSERT INTO "refresh_token" (id, token, is_forbidden, user_id, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6);';
    await this.connection.query(query, [
      id,
      token,
      isForbidden,
      userId,
      createdAt,
      updatedAt,
    ]);
  }

  async findByTokenAsync(
    token: string
  ): Promise<ITokenReadByEmailResultDto | undefined> {
    const query =
      'SELECT id, is_forbidden FROM refresh_token WHERE token = $1;';
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
    userId: string
  ): Promise<ITokenForbiddenAllResultDto[]> {
    const query =
      'UPDATE refresh_token SET is_forbidden = true WHERE user_id = $1 AND is_forbidden = false RETURNING id;';
    const { rows } = await this.connection.query<ITokenForbiddenAllResultDto>(
      query,
      [userId]
    );
    return rows;
  }

  async checkIdExistenceAsync(id: string): Promise<boolean> {
    const query = 'SELECT id FROM refresh_token WHERE id = $1;';
    const { rows } = await this.connection.query(query, [id]);
    return rows[0] ? true : false;
  }

  async checkTokenExistanceAsync(token: string): Promise<boolean> {
    const query = 'SELECT token FROM refresh_token WHERE token = $1;';
    const { rows } = await this.connection.query(query, [token]);
    return rows[0] ? true : false;
  }
}
