import { Request, Response, NextFunction } from 'express';
import { InvalidRequestError } from '../errors';
import { PoolProvider } from '../providers';
import {
  AccessTokenRepositoryPostgresql,
  RefreshTokenRepositoryPostgresql,
} from '../repositories/tokenRepositories';
import { UserRepositoryPostgresql } from '../repositories/userRepository';
import { UserService } from '../services';
import {
  AccessTokenService,
  RefreshTokenService,
} from '../services/tokenServices';
import { DatabaseConnection } from '../types';

export class AuthController {
  static async createBothTokens(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const userService = AuthController.getUserService();
      const email = req.query.email?.toString() ?? '';
      const password = req.query.password?.toString() ?? '';
      if (!email || !password) throw new InvalidRequestError('NullCredentials');
      const userId = await userService.findAsync({ email, password });
      const client = await PoolProvider.pool.connect();
      const refreshTokenService = AuthController.getRefreshTokenService(client);
      const accessTokenService = AuthController.getAccessTokenService(client);
      try {
        client.query('BEGIN');
        const forbidRefreshTokensId =
          await refreshTokenService.forbidAllTokensAsync(userId);
        forbidRefreshTokensId.forEach(async ({ id: refreshTokenId }) => {
          await accessTokenService.forbidAllTokensAsync(refreshTokenId);
        });
        const { token: refreshToken, id: refreshTokenId } =
          await refreshTokenService.createAsync({
            parentId: userId,
            userId,
          });
        const { token: accessToken } = await accessTokenService.createAsync({
          parentId: refreshTokenId,
          userId,
        });
        client.query('COMMIT');
        res.status(200).json({
          accessToken,
          refreshToken,
        });
      } catch (err) {
        client.query('ROLLBACK');
        throw err;
      } finally {
        client.release();
      }
    } catch (err) {
      next(err);
    }
  }

  static async createNewAccessToken(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const refreshToken = req.params.refreshToken?.toString() ?? '';
      if (!refreshToken) throw new InvalidRequestError('NullRefreshToken');
      const client = await PoolProvider.pool.connect();
      const refreshTokenService = AuthController.getRefreshTokenService(client);
      const accessTokenService = AuthController.getAccessTokenService(client);
      const { id, parentId } = await refreshTokenService.verifyTokenAsync(
        refreshToken
      );
      try {
        client.query('BEGIN');
        await accessTokenService.forbidAllTokensAsync(id);
        const { token: accessToken } = await accessTokenService.createAsync({
          parentId: id,
          userId: parentId,
        });
        client.query('COMMIT');
        res.status(200).json({
          accessToken,
        });
      } catch (err) {
        client.query('ROLLBACK');
        throw err;
      } finally {
        client.release();
      }
    } catch (err) {
      next(err);
    }
  }

  private static getRefreshTokenService(
    connection: DatabaseConnection = PoolProvider.pool
  ) {
    const repository = new RefreshTokenRepositoryPostgresql(connection);
    return new RefreshTokenService(repository);
  }

  private static getAccessTokenService(
    connection: DatabaseConnection = PoolProvider.pool
  ) {
    const repository = new AccessTokenRepositoryPostgresql(connection);
    return new AccessTokenService(repository);
  }

  private static getUserService(
    connection: DatabaseConnection = PoolProvider.pool
  ) {
    const repository = new UserRepositoryPostgresql(connection);
    return new UserService(repository);
  }
}
