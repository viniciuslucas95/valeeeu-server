import { BaseModel } from '../../entities/models';

export interface IRepository<T extends BaseModel> {
  createAsync(data: T): Promise<void>;
  checkIdExistenceAsync(id: string): Promise<boolean>;
}
