import { BaseModel } from '../base-model';

export abstract class BaseToken extends BaseModel {
  token!: string;
  isForbidden!: boolean;
}
