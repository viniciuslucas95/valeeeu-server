import { BaseModel } from '../base-model';

export class ServiceProfileItem extends BaseModel {
  item!: string;
  price!: number;
  readonly profileId!: string;
}
