import { randomUUID } from 'crypto';
import { BaseModel } from '../entities/models';
import { IRepository } from '../repositories/interfaces';

export abstract class BaseService<T extends BaseModel> {
  constructor(private readonly repository: IRepository<T>) {}

  protected async generateNewIdAsync() {
    let newId = this.generateNewId();
    while (await this.checkIdExistanceAsync(newId))
      newId = this.generateNewId();
    return newId;
  }

  protected getCurrentDate() {
    return new Date();
  }

  private async checkIdExistanceAsync(id: string) {
    return await this.repository.checkIdExistenceAsync(id);
  }

  private generateNewId() {
    return randomUUID().replace(/[-]/gm, '');
  }
}
