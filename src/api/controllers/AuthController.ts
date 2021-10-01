import { Request, Response, NextFunction } from 'express';
import { InvalidRequestError } from '../errors';
import {
  AccessTokenServiceFactory,
  RefreshTokenServiceFactory,
  UserServiceFactory,
} from '../factories';
import { PoolProvider } from '../providers';

export class AuthController {
  static async createBothTokens(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const email = req.query.email?.toString() ?? '';
      const password = req.query.password?.toString() ?? '';
      if (!email || !password) throw new InvalidRequestError('NullCredentials');
      const userService = UserServiceFactory.create();
      const userId = await userService.logInAsync({ email, password });
      const client = await PoolProvider.pool.connect();
      const refreshTokenService = RefreshTokenServiceFactory.create(client);
      const accessTokenService = AccessTokenServiceFactory.create(client);
      try {
        client.query('BEGIN');
        const forbiddenRefreshTokensId =
          await refreshTokenService.forbidAllTokensAsync(userId);
        for (let i = 0; i < forbiddenRefreshTokensId.length; i++) {
          await accessTokenService.forbidAllTokensAsync(
            forbiddenRefreshTokensId[i].id
          );
        }
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
      const refreshTokenService = RefreshTokenServiceFactory.create(client);
      const accessTokenService = AccessTokenServiceFactory.create(client);
      const { id: refreshTokenId, parentId: userId } =
        await refreshTokenService.verifyTokenAsync(refreshToken);
      try {
        client.query('BEGIN');
        await accessTokenService.forbidAllTokensAsync(refreshTokenId);
        const { token: accessToken } = await accessTokenService.createAsync({
          parentId: refreshTokenId,
          userId,
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
}
