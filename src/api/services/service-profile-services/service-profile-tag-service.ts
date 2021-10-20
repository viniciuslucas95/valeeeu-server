import { IServiceProfileTagDto } from '../../entities/dtos/service-profile-dtos';
import { InvalidRequestError } from '../../errors';
import { IServiceProfileTagRepository } from '../../repositories/interfaces/service-profile/service-profile-tag-repository';
import { WordValidator } from '../../validators';
import { BaseChildService } from '../base-child-service';

interface IServiceProfileTagData extends IServiceProfileTagDto {
  serviceId: string;
}

export class ServiceProfileTagService extends BaseChildService {
  constructor(private readonly repository: IServiceProfileTagRepository) {
    super(repository, new InvalidRequestError('ServiceProfileTagNotFound'));
  }

  async createAsync(data: IServiceProfileTagData): Promise<string> {
    const { tag, serviceId: profileId } = data;
    const { newId, currentDate } = await this.generateNewBaseModelData();
    await this.repository.createAsync({
      id: newId,
      tag: this.getValidatedTag(tag),
      serviceId: profileId,
      createdAt: currentDate,
      updatedAt: currentDate,
    });
    return newId;
  }

  async updateAsync(id: string, data: IServiceProfileTagData) {
    const { tag, serviceId: profileId } = data;
    const result = await this.repository.getByIdAndParentIdAsync(id, profileId);
    if (!result) throw this.notFoundError;
    await this.repository.updateAsync(id, {
      tag: tag ? this.getValidatedTag(tag) : result.tag,
      updatedAt: this.getCurrentDate(),
    });
  }

  async deleteAsync(id: string, parentId: string) {
    await this.validateExistenceByIdAndParentIdAsync(id, parentId);
    await this.repository.deleteAsync(id);
  }

  private getValidatedTag(value: string) {
    WordValidator.validate(value);
    return value;
  }
}
