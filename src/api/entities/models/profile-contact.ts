import { BaseModel } from './base-model';
import { Id } from '../../data-types/types';

export class ProfileContact extends BaseModel {
  plataform!: string;
  contact!: string;
  readonly profileId!: Id;
}
