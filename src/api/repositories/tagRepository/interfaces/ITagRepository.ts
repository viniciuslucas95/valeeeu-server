import { Tag } from '../../../entities/models';
import { IRepository } from '../../interfaces';

export interface ITagRepository extends IRepository<Tag> {
  deleteAllTagsAsync(workerProfileId: string): Promise<void>;
}
