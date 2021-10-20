import { IProfileDto } from '../../entities/dtos/profile-dtos';
import { ConflictError, InvalidRequestError } from '../../errors';
import { IProfileRepository } from '../../repositories/interfaces/profile/profile-repository';
import { WordValidator } from '../../validators';
import { BaseChildService } from '../base-child-service';

interface IProfileData extends IProfileDto {
  accountId: string;
}

export class ProfileService extends BaseChildService {
  constructor(private readonly repository: IProfileRepository) {
    super(repository, new InvalidRequestError('ProfileNotFound'));
  }

  async createAsync(data: IProfileData): Promise<string> {
    const { name, accountId } = data;
    this.validateName(name);
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
    this.validateName(name);
    const result = await this.repository.getByIdAndParentIdAsync(id, accountId);
    if (!result) throw this.notFoundError;
    await this.repository.updateAsync(id, {
      name,
      updatedAt: this.getCurrentDate(),
    });
  }

  async deleteAsync(id: string, parentId: string) {
    await this.validateExistenceByIdAndParentIdAsync(id, parentId);
    await this.repository.deleteAsync(id);
  }

  async validateUniqueExistenceByParentId(parentId: string) {
    if (await this.repository.checkExistenceByParentIdAsync(parentId))
      throw new ConflictError('ProfileAlreadyCreated');
  }

  private validateName(value: string) {
    WordValidator.validate(value);
  }
}
