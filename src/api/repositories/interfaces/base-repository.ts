import { Id } from '../../data-types/types';

export interface IBaseRepository {
  checkExistanceByIdAsync(id: Id): Promise<boolean>;
}
