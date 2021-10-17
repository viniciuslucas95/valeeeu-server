import { Id } from '../../data-types/types';

export abstract class BaseModel {
  readonly id!: Id;
  readonly createdAt!: Date;
  updatedAt!: Date;
}
