import { InvalidRequestError } from '../errors';
import { IReadRepository } from '../repositories/interfaces/base-repository';
import { IReadParentRepository } from '../repositories/interfaces/parent-repository';
import { BaseService } from './base-service';

export abstract class BaseChildService extends BaseService {
  constructor(
    private readonly baseChildRepository: IReadParentRepository<
      unknown,
      unknown
    > &
      IReadRepository<unknown, unknown>,
    notFoundError: InvalidRequestError
  ) {
    super(baseChildRepository, notFoundError);
  }

  async validateExistenceByIdAndParentIdAsync(
    id: string,
    parentId: string,
    error: Error = this.notFoundError
  ) {
    if (
      !(await this.baseChildRepository.checkExistenceByIdAndParentIdAsync(
        id,
        parentId
      ))
    )
      throw error;
  }

  async getByIdAndParentIdAsync(id: string, parentId: string) {
    const result = await this.baseChildRepository.getByIdAndParentIdAsync(
      id,
      parentId
    );
    if (!result) throw this.notFoundError;
    return result;
  }

  async getAllByParentIdAsync(parentId: string) {
    const result = await this.baseChildRepository.getAllByParentIdAsync(
      parentId
    );
    if (!result) throw this.notFoundError;
    return result;
  }
}
