import { BaseModel } from './BaseModel';

export class Tag extends BaseModel {
  readonly name!: string;
  readonly workerProfileId!: string;
}
