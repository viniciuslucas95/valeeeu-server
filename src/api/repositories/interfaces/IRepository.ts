import { BaseModel } from '../../entities/models';

export interface IRepository<T extends BaseModel> {
  createAsync(data: T): Promise<void>;
  checkExistanceByIdAsync(id: string): Promise<boolean>;
}
