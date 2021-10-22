import { RefreshToken } from '../../../entities/models/tokens';
import {
  IReadTokenRepository,
  IWriteTokenRepository,
} from './base-token-repository';

export interface IRefreshTokenRepository
  extends IWriteRefreshTokenRepository,
    IReadRefreshTokenRepository {}

export interface IReadRefreshTokenRepository extends IReadTokenRepository {}

export interface IWriteRefreshTokenRepository
  extends IWriteTokenRepository<RefreshToken> {}
