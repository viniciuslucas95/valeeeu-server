import { BaseModel } from '../BaseModel';

export abstract class BaseToken extends BaseModel {
  readonly token!: string;
  isForbidden!: boolean;
}
