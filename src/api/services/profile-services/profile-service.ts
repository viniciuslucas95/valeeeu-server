import { IProfileDto } from '../../entities/dtos/profile-dtos';
import { ConflictError, InvalidRequestError } from '../../errors';
import { IProfileRepository } from '../../repositories/interfaces/profile-repository';
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
    const profile = await this.repository.getByIdAndParentIdAsync(
      id,
      accountId
    );
    if (!profile) throw this.notFoundError;
    await this.repository.updateAsync(id, {
      name,
      updatedAt: this.getCurrentDate(),
    });
  }

  async deleteAsync(id: string, accountId: string) {
    await this.validateExistenceByIdAndParentIdAsync(id, accountId);
    await this.repository.deleteAsync(id);
  }

  async validateUniqueExistenceByParentId(accountId: string) {
    if (await this.repository.checkExistenceByParentIdAsync(accountId))
      throw new ConflictError('ProfileAlreadyCreated');
  }

  private validateName(name: string) {
    WordValidator.validate(name);
  }
}
