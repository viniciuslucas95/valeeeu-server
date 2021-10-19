import { BaseModel } from '..';

export class ProfilePicture extends BaseModel {
  picture!: string;
  readonly profileId!: string;
}
