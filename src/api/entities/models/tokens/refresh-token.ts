import { BaseToken } from './base-token';

export class RefreshToken extends BaseToken {
  readonly accountId!: string;
}
