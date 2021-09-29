import { BaseModel } from './BaseModel';

export class User extends BaseModel {
  public email!: string;
  public password!: string;
}
