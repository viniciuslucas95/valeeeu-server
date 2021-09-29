import { SignOptions } from 'jsonwebtoken';

export class JwtConfig {
  static readonly accessTokenOptions: SignOptions = {
    expiresIn: '5min',
  };
  static readonly refreshTokenOptions: SignOptions = {
    expiresIn: '30d',
  };
}
