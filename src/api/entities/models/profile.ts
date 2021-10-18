import { Id } from '../../data-types/types';
import { BaseModel } from './base-model';

export class Profile extends BaseModel {
  name!: string;
  readonly accountId!: Id;
}
