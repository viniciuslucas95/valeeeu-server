import { JwtPayload, sign, verify } from 'jsonwebtoken';
import { EnvironmentConfig, JwtConfig } from '../../../configs';
import { ITokenPayloadResultDto } from '../../entities/dtos/token';
import { AccessToken } from '../../entities/models/tokens';
import { BaseTokenService } from './BaseTokenService';

export class AccessTokenService extends BaseTokenService<AccessToken> {
  protected async createNewToken(
    parentId: string,
    token: string
  ): Promise<AccessToken> {
    const { newId, currentDate } = await this.generateBaseModel();
    return {
      id: newId,
      token,
      isForbidden: false,
      refreshTokenId: parentId,
      createdAt: currentDate,
      updatedAt: currentDate,
    };
  }

  verifyToken(token: string): string {
    const { id } = <JwtPayload>(
      verify(
        token,
        EnvironmentConfig.accessTokenSecret,
        JwtConfig.accessTokenOptions
      )
    );
    return id;
  }

  protected createJwtToken(payload: ITokenPayloadResultDto): string {
    return sign(payload, EnvironmentConfig.accessTokenSecret, {
      jwtid: this.generateNewId(),
      ...JwtConfig.accessTokenOptions,
    });
  }
}
