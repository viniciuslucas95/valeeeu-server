import { InvalidRequestError } from '../errors';
import { DataHandler } from '../helpers';
import { IReadRepository } from '../repositories/interfaces/base-repository';

interface IBaseModelData {
  newId: string;
  currentDate: Date;
}

export abstract class BaseService {
  constructor(
    private readonly baseRepository: IReadRepository<unknown, unknown>,
    protected readonly notFoundError: InvalidRequestError
  ) {}

  async getAsync(id: string) {
    const result = await this.baseRepository.getAsync(id);
    if (!result) throw this.notFoundError;
    return result;
  }

  async getAllAsync() {
    return await this.baseRepository.getAllAsync();
  }

  async validateExistenceAsync(id: string) {
    if (!(await this.baseRepository.checkExistenceAsync(id)))
      throw this.notFoundError;
  }

  protected async generateNewBaseModelData(): Promise<IBaseModelData> {
    const newId = await this.generateNewIdAsync();
    const currentDate = this.getCurrentDate();
    return { newId, currentDate };
  }

  protected getCurrentDate() {
    return new Date();
  }

  protected generateNewId() {
    return DataHandler.generateRandomId();
  }

  private async generateNewIdAsync() {
    let newId = this.generateNewId();
    while (await this.baseRepository.checkExistenceAsync(newId))
      newId = this.generateNewId();
    return newId;
  }
}
