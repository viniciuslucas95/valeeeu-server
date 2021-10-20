import { BaseModel } from '../base-model';

export class ServiceProfilePicture extends BaseModel {
  picture!: string;
  readonly serviceId!: string;
}
