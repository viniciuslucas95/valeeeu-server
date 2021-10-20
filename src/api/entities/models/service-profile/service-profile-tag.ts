import { BaseModel } from '../base-model';

export class ServiceProfileTag extends BaseModel {
  tag!: string;
  readonly serviceId!: string;
}
