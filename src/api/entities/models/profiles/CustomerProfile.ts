import { BaseModel } from '../BaseModel';

export class CustomerProfile extends BaseModel {
  name!: string;
  readonly userId!: string;
}
