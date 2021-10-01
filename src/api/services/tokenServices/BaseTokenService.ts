import { BaseToken } from '../../entities/models/tokens';
import { BaseService } from '../BaseService';
import { ConflictError, ForbiddenError, ServerError } from '../../errors';
import { ITokenRepository } from '../../repositories/tokenRepositories/interfaces';
import {
  ITokenCreationResultDto,
  ITokenCreationDto,
  ITokenPayloadResultDto,
  ITokenVerifyResultDto,
} from '../../entities/dtos/token';

export abstract class BaseTokenService<
  T extends BaseToken
> extends BaseService<T> {
  constructor(private readonly tokenRepository: ITokenRepository<T>) {
    super(tokenRepository);
  }

  async createAsync(data: ITokenCreationDto): Promise<ITokenCreationResultDto> {
    const { parentId, userId } = data;
    const token = this.createJwtToken({ id: userId });
    await this.checkExistanceByTokenAsync(token);
    const newToken: T = await this.createNewToken(parentId, token);
    await this.tokenRepository.createAsync(newToken);
    return {
      id: newToken.id,
      token,
    };
  }

  async verifyTokenAsync(token: string): Promise<ITokenVerifyResultDto> {
    const userId = this.verifyToken(token);
    const refreshToken = await this.tokenRepository.findByTokenAsync(token);
    if (!refreshToken) throw new ServerError('TokenNotFound');
    if (refreshToken.isForbidden) throw new ForbiddenError('ForbiddenToken');
    return {
      id: refreshToken.id,
      parentId: userId,
    };
  }

  async forbidAllTokensAsync(parentId: string) {
    return await this.tokenRepository.forbidAllTokens(parentId);
  }

  private async checkExistanceByTokenAsync(token: string) {
    const result = await this.tokenRepository.checkExistanceByTokenAsync(token);
    if (result) throw new ConflictError('TokenAlreadyExists');
  }

  protected abstract verifyToken(token: string): string;

  protected abstract createNewToken(
    parentId: string,
    token: string
  ): Promise<T>;

  protected abstract createJwtToken(payload: ITokenPayloadResultDto): string;
}
