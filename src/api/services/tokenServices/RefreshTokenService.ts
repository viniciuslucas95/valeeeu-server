import { JwtPayload, sign, verify } from 'jsonwebtoken';
import { EnvironmentConfig, JwtConfig } from '../../../configs';
import { ITokenPayloadResultDto } from '../../entities/dtos/token';
import { RefreshToken } from '../../entities/models/tokens';
import { BaseTokenService } from './BaseTokenService';

export class RefreshTokenService extends BaseTokenService<RefreshToken> {
  protected createNewToken(
    newId: string,
    parentId: string,
    token: string
  ): RefreshToken {
    return {
      id: newId,
      token,
      isForbidden: false,
      userId: parentId,
      createdAt: this.getCurrentDate(),
      updatedAt: this.getCurrentDate(),
    };
  }

  protected verifyToken(token: string): ITokenPayloadResultDto {
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
    return sign(
      payload,
      EnvironmentConfig.refreshTokenSecret,
      JwtConfig.refreshTokenOptions
    );
  }
}
