import { Id } from '../../data-types/types';
import { IIdDto, IProfileDataDto } from '../../entities/dtos';
import { ConflictError, InvalidRequestError } from '../../errors';
import { IProfileRepository } from '../../repositories/interfaces';
import { BaseService } from '../base-service';

interface IProfileCreation extends IProfileDataDto {
  accountId: Id;
}

export class ProfileService extends BaseService {
  private readonly profileNotFoundError = new InvalidRequestError(
    'ProfileNotFound'
  );

  constructor(private readonly repository: IProfileRepository) {
    super(repository);
  }

  async createAsync(data: IProfileCreation): Promise<IIdDto> {
    const { name, accountId } = data;
    const { newId, currentDate } = await this.generateNewBaseModelData();
    await this.repository.createAsync({
      id: newId,
      name,
      accountId,
      createdAt: currentDate,
      updatedAt: currentDate,
    });
    return { id: newId };
  }

  async updateAsync(id: Id, data: IProfileDataDto) {
    const { name, accountId } = data;
    const profile = await this.repository.getProfileByIdsAsync(id, accountId);
    if (!profile) throw this.profileNotFoundError;
    await this.repository.updateAsync(id, {
      name,
      updatedAt: this.getCurrentDate(),
    });
  }

  async deleteAsync(id: Id, accountId: Id) {
    await this.validateExistenceAndRelationshipAsync(id, accountId);
    await this.repository.deleteAsync(id);
  }

  async getProfileAsync(id: Id) {
    const profile = await this.repository.getProfileAsync(id);
    if (!profile) throw this.profileNotFoundError;
    return profile;
  }

  async getAllProfilesAsync() {
    return await this.repository.getAllProfilesAsync();
  }

  async validateExistenceAndRelationshipAsync(
    id: Id,
    accountId: Id,
    error: Error = this.profileNotFoundError
  ) {
    if (
      !(await this.repository.checkExistenceAndRelationshipAsync(id, accountId))
    )
      throw error;
  }

  async checkExistenceByAccountId(accountId: Id) {
    if (await this.repository.checkExistenceByAccountIdAsync(accountId))
      throw new ConflictError('ProfileAlreadyCreated');
  }
}
