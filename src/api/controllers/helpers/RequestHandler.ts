import { Request } from 'express';
import { ForbiddenError } from '../../errors';
import { AccessTokenServiceFactory } from '../../factories';

export class RequestHandler {
  async verifyAccessTokenAsync(token: string) {
    const accessTokenService = AccessTokenServiceFactory.create();
    return accessTokenService.verifyToken(token);
  }

  static async verifyAccessTokenAsync(req: Request): Promise<string> {
    const token =
      req.headers['authorization']?.split(' ')[1] ??
      req.params.accessToken?.toString();
    if (!token) throw new ForbiddenError('NullToken');
    const requestHandler = new RequestHandler();
    const id = await requestHandler.verifyAccessTokenAsync(token);
    return id;
  }
}
