import { BaseModel } from '../base-model';

export class ServiceProfile extends BaseModel {
  description!: string;
  readonly profileId!: string;
}
