import {
  ITokenReadByEmailResultDto,
  ITokenForbiddenAllResultDto,
} from '../../../entities/dtos/token';
import { BaseToken } from '../../../entities/models/tokens';
import { IRepository } from '../../interfaces';

export interface ITokenRepository<T extends BaseToken> extends IRepository<T> {
  checkExistanceByTokenAsync(token: string): Promise<boolean>;
  forbidAllTokens(parentId: string): Promise<ITokenForbiddenAllResultDto[]>;
  findByTokenAsync(
    token: string
  ): Promise<ITokenReadByEmailResultDto | undefined>;
}
