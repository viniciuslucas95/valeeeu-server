import { BaseModel } from '../base-model';

export class ProfileContact extends BaseModel {
  plataform!: string;
  contact!: string;
  readonly profileId!: string;
}
