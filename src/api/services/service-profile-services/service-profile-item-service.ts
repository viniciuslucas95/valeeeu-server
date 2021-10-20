import { IServiceProfileItemDto } from '../../entities/dtos/service-profile-dtos';
import { InvalidRequestError } from '../../errors';
import { IServiceProfileItemRepository } from '../../repositories/interfaces/service-profile/service-profile-item-repository';
import { PriceValidator, WordValidator } from '../../validators';
import { BaseChildService } from '../base-child-service';

interface IServiceProfileItemData extends IServiceProfileItemDto {
  serviceId: string;
}

export class ServiceProfileItemService extends BaseChildService {
  constructor(private readonly repository: IServiceProfileItemRepository) {
    super(repository, new InvalidRequestError('ServiceProfileItemNotFound'));
  }

  async createAsync(data: IServiceProfileItemData): Promise<string> {
    const { item, price, serviceId: profileId } = data;
    const { newId, currentDate } = await this.generateNewBaseModelData();
    await this.repository.createAsync({
      id: newId,
      item: this.getValidatedItem(item),
      price: this.getValidatedPrice(price),
      profileId,
      createdAt: currentDate,
      updatedAt: currentDate,
    });
    return newId;
  }

  async updateAsync(id: string, data: IServiceProfileItemData) {
    const { price, item, serviceId: profileId } = data;
    const result = await this.repository.getByIdAndParentIdAsync(id, profileId);
    if (!result) throw this.notFoundError;
    await this.repository.updateAsync(id, {
      item: item ? this.getValidatedItem(item) : result.item,
      price: price ? this.getValidatedPrice(price) : result.price,
      updatedAt: this.getCurrentDate(),
    });
  }

  async deleteAsync(id: string, parentId: string) {
    await this.validateExistenceByIdAndParentIdAsync(id, parentId);
    await this.repository.deleteAsync(id);
  }

  private getValidatedItem(value: string) {
    WordValidator.validate(value);
    return value;
  }

  private getValidatedPrice(value: number) {
    PriceValidator.validate(value);
    return value;
  }
}
