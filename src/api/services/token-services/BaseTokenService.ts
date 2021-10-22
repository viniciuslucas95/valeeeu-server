import { BaseToken } from '../../entities/models/tokens';
import { ForbiddenError, InvalidRequestError } from '../../errors';
import { ITokenRepository } from '../../repositories/interfaces/tokens/base-token-repository';
import { BaseService } from '../base-service';

interface ITokenCreationDto {
  token: string;
  parentId: string;
}

export abstract class BaseTokenService<
  T extends BaseToken
> extends BaseService {
  constructor(
    protected readonly repository: ITokenRepository<T>,
    notFoundError: InvalidRequestError
  ) {
    super(repository, notFoundError);
  }

  async createAsync(data: ITokenCreationDto) {
    const { parentId, token } = data;
    const { newId, currentDate } = await this.generateNewBaseModelData();
    await this.createTokenAsync(token, parentId, newId, currentDate);
    return newId;
  }

  abstract createTokenAsync(
    token: string,
    parentId: string,
    newId: string,
    currentDate: Date
  ): Promise<void>;

  async forbidAllTokensAsync(parentId: string) {
    const results = await this.repository.forbidAllTokensAsync(
      parentId,
      this.getCurrentDate()
    );
    return results.map((result) => result.id);
  }

  async getValidatedTokenAsync(token: string) {
    const result = await this.repository.getByTokenAsync(token);
    if (!result) throw this.notFoundError;
    if (result.isForbidden) throw new ForbiddenError('ForbiddenToken');
    return result.id;
  }

  async checkExistenceByTokenAsync(token: string) {
    return this.repository.checkExistenceByTokenAsync(token);
  }
}
