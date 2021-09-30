import { BaseModel } from '../BaseModel';

export class WorkerProfile extends BaseModel {
  name!: string;
  job!: string;
  description?: string;
  readonly userId!: string;
}
