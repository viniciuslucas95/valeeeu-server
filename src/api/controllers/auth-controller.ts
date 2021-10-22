import { NextFunction, Request, Response } from 'express';
import { InvalidRequestError, ServerError } from '../errors';
import { AccountServiceFactory } from '../factories';
import {
  AccessTokenServiceFactory,
  RefreshTokenServiceFactory,
} from '../factories/token-service-factories';
import { PostgresqlTransactionHandler } from '../helpers';
import { PoolProvider } from '../providers';
import { JwtService } from '../services';

export class AuthController {
  static async getTokensAsync(req: Request, res: Response, next: NextFunction) {
    try {
      const email = req.query.email;
      const password = req.query.password;
      if (!email) throw new InvalidRequestError('NullEmail');
      if (typeof email !== 'string')
        throw new InvalidRequestError('EmailMustBeAString');
      if (!password) throw new InvalidRequestError('NullPassword');
      if (typeof password !== 'string')
        throw new InvalidRequestError('PasswordMustBeAString');
      const accountService = AccountServiceFactory.create();
      const accountId = await accountService.getValidatedAccountAsync({
        email,
        password,
      });
      const jwtService = new JwtService();
      const refreshToken = jwtService.createRefreshToken({ accountId });
      const tokenCreationError = new ServerError('TokenCreationError');
      const refreshTokenService = RefreshTokenServiceFactory.create();
      if (await refreshTokenService.checkExistenceByTokenAsync(refreshToken))
        throw tokenCreationError;
      const accessToken = jwtService.createAccessToken({ accountId });
      const accessTokenService = AccessTokenServiceFactory.create();
      if (await accessTokenService.checkExistenceByTokenAsync(accessToken))
        throw tokenCreationError;
      const client = await PoolProvider.pool.connect();
      await PostgresqlTransactionHandler.startTransactionAsync(
        client,
        async () => {
          const forbiddenRefreshTokenIds =
            await refreshTokenService.forbidAllTokensAsync(accountId);
          for (let i = 0; i < forbiddenRefreshTokenIds.length; i++) {
            await accessTokenService.forbidAllTokensAsync(
              forbiddenRefreshTokenIds[i]
            );
          }
          const refreshTokenId = await refreshTokenService.createAsync({
            token: refreshToken,
            parentId: accountId,
          });
          // TEST AN ERROR
          await accessTokenService.createAsync({
            token: accessToken,
            parentId: refreshTokenId,
          });
        }
      );
      res.status(200).json({ accountId, accessToken, refreshToken });
    } catch (err) {
      next(err);
    }
  }

  static async getNewAccessTokenAsync(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const refreshToken = req.params['refreshToken'];
      if (!refreshToken) throw new InvalidRequestError('NullRefreshToken');
      if (typeof refreshToken !== 'string')
        throw new InvalidRequestError('RefreshTokenMustBeAString');
      const jwtService = new JwtService();
      const { accountId } = jwtService.verifyRefreshToken(refreshToken);
      const refreshTokenService = RefreshTokenServiceFactory.create();
      const refreshTokenId = await refreshTokenService.getValidatedTokenAsync(
        refreshToken
      );
      const accessToken = jwtService.createAccessToken({ accountId });
      const accessTokenService = AccessTokenServiceFactory.create();
      await accessTokenService.checkExistenceByTokenAsync(accessToken);
      const client = await PoolProvider.pool.connect();
      await PostgresqlTransactionHandler.startTransactionAsync(
        client,
        async () => {
          await accessTokenService.forbidAllTokensAsync(refreshTokenId);
          await accessTokenService.createAsync({
            token: accessToken,
            parentId: refreshTokenId,
          });
        }
      );
      res.status(200).json({ accountId, accessToken });
    } catch (err) {
      next(err);
    }
  }

  static async verifyAccessTokenAsync(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const accessToken = req.params['accessToken'];
      if (!accessToken) throw new InvalidRequestError('NullAccessToken');
      if (typeof accessToken !== 'string')
        throw new InvalidRequestError('AccessTokenMustBeAString');
      const jwtService = new JwtService();
      const { accountId } = jwtService.verifyAccessToken(accessToken);
      const accountService = AccountServiceFactory.create();
      await accountService.validateExistenceAsync(accountId);
      const accessTokenService = AccessTokenServiceFactory.create();
      await accessTokenService.getValidatedTokenAsync(accessToken);
      res.sendStatus(200);
    } catch (err) {
      next(err);
    }
  }
}
