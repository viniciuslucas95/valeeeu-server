import { ITagCreationDto } from '../entities/dtos/tag';
import { Tag } from '../entities/models';
import { InvalidRequestError } from '../errors';
import { ITagRepository } from '../repositories/tagRepository/interfaces';
import { BaseService } from './BaseService';

export class TagService extends BaseService<Tag> {
  constructor(private readonly repository: ITagRepository) {
    super(repository);
  }

  async createAsync(data: ITagCreationDto) {
    const { name, workerProfileId } = data;
    this.validateName(name);
    const { newId, currentDate } = await this.generateBaseModel();
    const newTag: Tag = {
      id: newId,
      name,
      workerProfileId,
      createdAt: currentDate,
      updatedAt: currentDate,
    };
    await this.repository.createAsync(newTag);
    return newId;
  }

  async deleteAllTagsAsync(workerProfileId: string) {
    await this.repository.deleteAllTagsAsync(workerProfileId);
  }

  private validateName(name: string) {
    const secondPart = name.split(' ');
    if (secondPart[1]) throw new InvalidRequestError('TagMustBeOneWord');
  }
}
