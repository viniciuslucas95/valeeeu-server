import { Id } from '../../data-types/types';

export interface IBaseRepository {
  checkExistenceByIdAsync(id: Id): Promise<boolean>;
}
