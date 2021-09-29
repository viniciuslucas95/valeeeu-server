import { BaseToken } from './BaseToken';

export class AccessToken extends BaseToken {
  readonly refreshTokenId!: string;
}
