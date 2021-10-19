import { BaseModel } from './base-model';

export class Profile extends BaseModel {
  name!: string;
  readonly accountId!: string;
}
