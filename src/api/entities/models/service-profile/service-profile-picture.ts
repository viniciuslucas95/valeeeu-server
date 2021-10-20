import { BaseModel } from '../base-model';

export class ServiceProfilePicture extends BaseModel {
  picture!: string;
  readonly profileId!: string;
}
