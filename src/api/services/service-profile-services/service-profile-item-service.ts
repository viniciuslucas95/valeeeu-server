import { IServiceProfileItemDto } from '../../entities/dtos/service-profile-dtos';
import { InvalidRequestError } from '../../errors';
import { IServiceProfileItemRepository } from '../../repositories/interfaces/service-profile/service-profile-item-repository';
import { PositiveNumberValidator, WordValidator } from '../../validators';
import { BaseChildService } from '../base-child-service';

interface IServiceProfileItemCreationData extends IServiceProfileItemDto {
  serviceId: string;
}

interface IServiceProfileItemUpdateData
  extends Partial<IServiceProfileItemDto> {
  serviceId: string;
}

export class ServiceProfileItemService extends BaseChildService {
  constructor(private readonly repository: IServiceProfileItemRepository) {
    super(repository, new InvalidRequestError('ServiceProfileItemNotFound'));
  }

  async createAsync(data: IServiceProfileItemCreationData): Promise<string> {
    const { item, price, serviceId } = data;
    const { newId, currentDate } = await this.generateNewBaseModelData();
    await this.repository.createAsync({
      id: newId,
      item: this.getValidatedItem(item),
      price: this.getValidatedPrice(price),
      serviceId,
      createdAt: currentDate,
      updatedAt: currentDate,
    });
    return newId;
  }

  async updateAsync(id: string, data: IServiceProfileItemUpdateData) {
    const { price, item, serviceId } = data;
    const result = await this.repository.getByIdAndParentIdAsync(id, serviceId);
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
    PositiveNumberValidator.validate(value);
    return value;
  }
}
