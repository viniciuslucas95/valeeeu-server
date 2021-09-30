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
  private readonly tokenAlreadyExistsError = new ConflictError(
    'TokenAlreadyExists'
  );
  private readonly tokenNotFoundError = new ServerError('TokenNotFound');
  private readonly forbiddenTokenError = new ForbiddenError('ForbiddenToken');

  constructor(private readonly tokenRepository: ITokenRepository<T>) {
    super(tokenRepository);
  }

  async createAsync(data: ITokenCreationDto): Promise<ITokenCreationResultDto> {
    const { parentId, userId } = data;
    const token = this.createJwtToken({ id: userId });
    await this.checkTokenExistanceAsync(token);
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
    if (!refreshToken) throw this.tokenNotFoundError;
    if (refreshToken.isForbidden) throw this.forbiddenTokenError;
    return {
      id: refreshToken.id,
      parentId: userId,
    };
  }

  async forbidAllTokensAsync(parentId: string) {
    return await this.tokenRepository.forbidAllTokens(parentId);
  }

  private async checkTokenExistanceAsync(token: string) {
    const result = await this.tokenRepository.checkTokenExistanceAsync(token);
    if (result) throw this.tokenAlreadyExistsError;
  }

  protected abstract verifyToken(token: string): string;

  protected abstract createNewToken(
    parentId: string,
    token: string
  ): Promise<T>;

  protected abstract createJwtToken(payload: ITokenPayloadResultDto): string;
}
