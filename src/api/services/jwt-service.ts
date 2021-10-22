import { sign, verify } from 'jsonwebtoken';
import { EnvironmentConfig, JwtConfig } from '../../configs';
import { DataHandler } from '../helpers';

interface ITokenPayloadDto {
  accountId: string;
}

export class JwtService {
  createAccessToken(payload: ITokenPayloadDto) {
    return sign(payload, EnvironmentConfig.accessTokenSecret, {
      jwtid: DataHandler.generateRandomId(),
      ...JwtConfig.accessTokenOptions,
    });
  }

  createRefreshToken(payload: ITokenPayloadDto) {
    return sign(payload, EnvironmentConfig.refreshTokenSecret, {
      jwtid: DataHandler.generateRandomId(),
      ...JwtConfig.refreshTokenOptions,
    });
  }

  verifyAccessToken(token: string): ITokenPayloadDto {
    const { accountId }: any = verify(
      token,
      EnvironmentConfig.accessTokenSecret,
      JwtConfig.accessTokenOptions
    );
    return { accountId };
  }

  verifyRefreshToken(token: string): ITokenPayloadDto {
    const { accountId }: any = verify(
      token,
      EnvironmentConfig.refreshTokenSecret,
      JwtConfig.refreshTokenOptions
    );
    return { accountId };
  }
}
