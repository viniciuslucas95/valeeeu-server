import { ITokenDto } from '../../../entities/dtos';
import { BaseToken } from '../../../entities/models/tokens';
import { IReadRepository, IWriteRepository } from '../base-repository';

export interface ITokenUpdateDto {
  isForbidden: boolean;
  updatedAt: Date;
}

export interface ITokenForbiddanceResultDto {
  id: string;
}

export interface ITokenResultDto {
  id: string;
  isForbidden: boolean;
}

export interface ITokenRepository<T extends BaseToken>
  extends IReadTokenRepository,
    IWriteTokenRepository<T> {}

export interface IReadTokenRepository
  extends IReadRepository<ITokenDto, unknown> {
  checkExistenceByTokenAsync(token: string): Promise<boolean>;
  getByTokenAsync(token: string): Promise<ITokenResultDto | undefined>;
}

export interface IWriteTokenRepository<T extends BaseToken>
  extends IWriteRepository<T, ITokenUpdateDto> {
  forbidAllTokensAsync(
    parentId: string,
    currentDate: Date
  ): Promise<ITokenForbiddanceResultDto[]>;
}
