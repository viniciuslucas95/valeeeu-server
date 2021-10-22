import { Request } from 'express';
import { ForbiddenError } from '../errors';
import { AccountServiceFactory } from '../factories';
import { AccessTokenServiceFactory } from '../factories/token-service-factories';
import { JwtService } from '../services';
import { RequestParamsHandler } from './request-params-handler';

export class RequestHeaderHandler {
  static async verifyAccessTokenAsync(req: Request) {
    const accessToken = req.headers['authorization']?.split(' ')[1];
    if (!accessToken) throw new ForbiddenError('AccessTokenNeeded');
    const jwtService = new JwtService();
    const { accountId } = jwtService.verifyAccessToken(accessToken);
    const accessTokenService = AccessTokenServiceFactory.create();
    await accessTokenService.getValidatedTokenAsync(accessToken);
    const accountService = AccountServiceFactory.create();
    await accountService.validateExistenceAsync(accountId);
    const { accountId: accountIdFromParam } =
      RequestParamsHandler.getAccountId(req);
    if (accountIdFromParam && accountId !== accountIdFromParam)
      throw new ForbiddenError('WrongAccessToken');
    return accountId;
  }
}
