import { RefreshToken } from '../../entities/models/tokens';
import { InvalidRequestError } from '../../errors';
import { IRefreshTokenRepository } from '../../repositories/interfaces/tokens/refresh-token-repository';
import { BaseTokenService } from './BaseTokenService';

export class RefreshTokenService extends BaseTokenService<RefreshToken> {
  constructor(repository: IRefreshTokenRepository) {
    super(repository, new InvalidRequestError('RefreshTokenNotFound'));
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
      accountId: parentId,
      createdAt: currentDate,
      updatedAt: currentDate,
    });
  }
}
