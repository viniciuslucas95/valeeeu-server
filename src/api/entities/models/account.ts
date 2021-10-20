import { BaseModel } from './base-model';

export class Account extends BaseModel {
  email!: string;
  password!: string;
}
