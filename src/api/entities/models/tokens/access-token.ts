import { BaseToken } from './base-token';

export class AccessToken extends BaseToken {
  readonly refreshTokenId!: string;
}
