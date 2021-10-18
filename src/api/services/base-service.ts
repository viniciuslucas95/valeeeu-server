import { randomUUID } from 'crypto';
import { IReadRepository } from '../repositories/interfaces';

interface IBaseModelData {
  newId: string;
  currentDate: Date;
}

export abstract class BaseService {
  constructor(
    private readonly baseRepository: Omit<
      IReadRepository<unknown, unknown>,
      'getAsync' | 'getAllAsync'
    >
  ) {}

  protected async generateNewBaseModelData(): Promise<IBaseModelData> {
    const newId = await this.generateNewIdAsync();
    const currentDate = this.getCurrentDate();
    return { newId, currentDate };
  }

  protected getCurrentDate() {
    return new Date();
  }

  protected generateNewId() {
    return randomUUID().replace(/[-]/gm, '');
  }

  private async generateNewIdAsync() {
    let newId = this.generateNewId();
    while (await this.baseRepository.checkExistenceAsync(newId))
      newId = this.generateNewId();
    return newId;
  }
}
