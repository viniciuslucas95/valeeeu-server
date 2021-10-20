import { BaseModel } from '../../entities/models';

export interface IWriteRepository<Model extends BaseModel, Update> {
  createAsync(data: Model): Promise<void>;
  updateAsync(id: string, data: Update): Promise<void>;
  deleteAsync(id: string): Promise<void>;
}

export interface IReadRepository<SingleResult, MultipleResults> {
  getAsync(id: string): Promise<SingleResult | undefined>;
  getAllAsync(): Promise<MultipleResults[]>;
  checkExistenceAsync(id: string): Promise<boolean>;
}
