import { randomUUID } from 'crypto';
import { Id } from '../data-types/types';
import { IBaseRepository } from '../repositories/interfaces';

interface IBaseModelData {
  newId: Id;
  currentDate: Date;
}

export abstract class BaseService {
  constructor(private readonly baseRepository: IBaseRepository) {}

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
    while (await this.baseRepository.checkExistanceByIdAsync(newId))
      newId = this.generateNewId();
    return newId;
  }
}
