import { AccessToken } from '../../entities/models/tokens';
import { InvalidRequestError } from '../../errors';
import { IAccessTokenRepository } from '../../repositories/interfaces/tokens/access-token-repository';
import { BaseTokenService } from './BaseTokenService';

export class AccessTokenService extends BaseTokenService<AccessToken> {
  constructor(repository: IAccessTokenRepository) {
    super(repository, new InvalidRequestError('AccessTokenNotFound'));
  }

  async createTokenAsync(
    token: string,
    parentId: string,
    newId: string,
    currentDate: Date
  ): Promise<void> {
    await this.repository.createAsync({
      id: newId,
      token,
      isForbidden: false,
      refreshTokenId: parentId,
      createdAt: currentDate,
      updatedAt: currentDate,
    });
  }
}
