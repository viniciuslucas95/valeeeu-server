import { BaseModel } from './base-model';

export class Account extends BaseModel {
  public email!: string;
  public password!: string;
}
