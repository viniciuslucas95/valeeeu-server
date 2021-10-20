export abstract class BaseModel {
  readonly id!: string;
  readonly createdAt!: Date;
  updatedAt!: Date;
}
