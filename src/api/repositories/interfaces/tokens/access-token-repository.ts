import { AccessToken } from '../../../entities/models/tokens';
import {
  IReadTokenRepository,
  IWriteTokenRepository,
} from './base-token-repository';

export interface IAccessTokenRepository
  extends IWriteAccessTokenRepository,
    IReadAccessTokenRepository {}

export interface IReadAccessTokenRepository extends IReadTokenRepository {}

export interface IWriteAccessTokenRepository
  extends IWriteTokenRepository<AccessToken> {}
