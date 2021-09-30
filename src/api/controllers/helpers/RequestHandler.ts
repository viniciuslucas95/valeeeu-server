import { Request } from 'express';
import { ForbiddenError } from '../../errors';
import { AccessTokenServiceFactory } from '../../factories';

export class RequestHandler {
  verifyAccessToken(req: Request) {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) throw new ForbiddenError('NullToken');
    const accessTokenService = AccessTokenServiceFactory.create();
    const id = accessTokenService.verifyToken(token);
    return id;
  }
}
