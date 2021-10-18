import { ConflictError, InvalidRequestError } from '../../errors';
import { IProfileRepository } from '../../repositories/interfaces';
import { BaseService } from '../base-service';

interface IProfileData {
  name: string;
  accountId: string;
}

export class ProfileService extends BaseService {
  private readonly profileNotFoundError = new InvalidRequestError(
    'ProfileNotFound'
  );

  constructor(private readonly repository: IProfileRepository) {
    super(repository);
  }

  async createAsync(data: IProfileData): Promise<string> {
    const { name, accountId } = data;
    const { newId, currentDate } = await this.generateNewBaseModelData();
    await this.repository.createAsync({
      id: newId,
      name,
      accountId,
      createdAt: currentDate,
      updatedAt: currentDate,
    });
    return newId;
  }

  async updateAsync(id: string, data: IProfileData) {
    const { name, accountId } = data;
    const profile = await this.repository.getByIdAndParentIdAsync(
      id,
      accountId
    );
    if (!profile) throw this.profileNotFoundError;
    await this.repository.updateAsync(id, {
      name,
      updatedAt: this.getCurrentDate(),
    });
  }

  async deleteAsync(id: string, accountId: string) {
    await this.validateExistenceByIdAndParentIdAsync(id, accountId);
    await this.repository.deleteAsync(id);
  }

  async getProfileAsync(id: string) {
    const profile = await this.repository.getAsync(id);
    if (!profile) throw this.profileNotFoundError;
    return profile;
  }

  async getAllProfilesAsync() {
    return await this.repository.getAllAsync();
  }

  async validateExistenceByIdAndParentIdAsync(
    id: string,
    accountId: string,
    error: Error = this.profileNotFoundError
  ) {
    if (
      !(await this.repository.checkExistenceByIdAndParentIdAsync(id, accountId))
    )
      throw error;
  }

  async checkExistenceByAccountId(accountId: string) {
    if (await this.repository.checkExistenceByParentIdAsync(accountId))
      throw new ConflictError('ProfileAlreadyCreated');
  }
}
