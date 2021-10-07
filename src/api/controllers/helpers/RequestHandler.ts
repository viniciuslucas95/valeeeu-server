import { Request } from 'express';
import { ForbiddenError } from '../../errors';
import { AccessTokenServiceFactory } from '../../factories';

export class RequestHandler {
  async verifyAccessTokenAsync(req: Request) {
    const token =
      req.headers['authorization']?.split(' ')[1] ??
      req.params['access-token']?.toString() ??
      req.query['access-token']?.toString();
    if (!token) throw new ForbiddenError('NullToken');
    const accessTokenService = AccessTokenServiceFactory.create();
    return accessTokenService.verifyTokenAsync(token);
  }
}