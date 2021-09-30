import { JwtPayload, sign, verify } from 'jsonwebtoken';
import { EnvironmentConfig, JwtConfig } from '../../../configs';
import { ITokenPayloadResultDto } from '../../entities/dtos/token';
import { RefreshToken } from '../../entities/models/tokens';
import { BaseTokenService } from './BaseTokenService';

export class RefreshTokenService extends BaseTokenService<RefreshToken> {
  protected async createNewToken(
    parentId: string,
    token: string
  ): Promise<RefreshToken> {
    const { newId, currentDate } = await this.generateBaseModel();
    return {
      id: newId,
      token,
      isForbidden: false,
      userId: parentId,
      createdAt: currentDate,
      updatedAt: currentDate,
    };
  }

  verifyToken(token: string): string {
    const { id } = <JwtPayload>(
      verify(
        token,
        EnvironmentConfig.refreshTokenSecret,
        JwtConfig.refreshTokenOptions
      )
    );
    return id;
  }

  protected createJwtToken(payload: ITokenPayloadResultDto): string {
    return sign(payload, EnvironmentConfig.refreshTokenSecret, {
      jwtid: this.generateNewId(),
      ...JwtConfig.refreshTokenOptions,
    });
  }
}
