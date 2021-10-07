import { BaseModel } from './BaseModel';

export class UserLocation extends BaseModel {
  latitude!: number;
  longitude!: number;
  readonly userId!: string;
}
