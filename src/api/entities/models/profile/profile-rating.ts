import { BaseModel } from '../base-model';

export class ProfileRating extends BaseModel {
  rating!: number;
  comment!: string;
  readonly profileId!: string;
}
