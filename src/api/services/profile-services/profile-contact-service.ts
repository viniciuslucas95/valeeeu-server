import { IProfileContactDto } from '../../entities/dtos/profile-dtos';
import { InvalidRequestError } from '../../errors';
import { IProfileContactRepository } from '../../repositories/interfaces/profile/profile-contact-repository';
import { WordValidator } from '../../validators';
import { BaseChildService } from '../base-child-service';

interface IProfileContactCreationData extends IProfileContactDto {
  profileId: string;
}

interface IProfileContactUpdateData extends Partial<IProfileContactDto> {
  profileId: string;
}

export class ProfileContactService extends BaseChildService {
  constructor(private readonly repository: IProfileContactRepository) {
    super(repository, new InvalidRequestError('ProfileContactNotFound'));
  }

  async createAsync(data: IProfileContactCreationData): Promise<string> {
    const { plataform, contact, profileId } = data;
    const { newId, currentDate } = await this.generateNewBaseModelData();
    await this.repository.createAsync({
      id: newId,
      plataform: this.getValidatedPlataform(plataform),
      contact: this.getValidatedContact(contact),
      profileId,
      createdAt: currentDate,
      updatedAt: currentDate,
    });
    return newId;
  }

  async updateAsync(id: string, data: IProfileContactUpdateData) {
    const { profileId, contact, plataform } = data;
    const profileContact = await this.repository.getByIdAndParentIdAsync(
      id,
      profileId
    );
    if (!profileContact) throw this.notFoundError;
    await this.repository.updateAsync(id, {
      plataform:
        plataform && plataform.length > 0
          ? this.getValidatedPlataform(plataform)
          : profileContact.plataform,
      contact:
        contact && contact.length > 0
          ? this.getValidatedContact(contact)
          : profileContact.contact,
      updatedAt: this.getCurrentDate(),
    });
  }

  async deleteAsync(id: string, profileId: string) {
    await this.validateExistenceByIdAndParentIdAsync(id, profileId);
    await this.repository.deleteAsync(id);
  }

  private getValidatedPlataform(plataform: string) {
    WordValidator.validate(plataform);
    return plataform;
  }

  private getValidatedContact(contact: string) {
    WordValidator.validate(contact);
    return contact;
  }
}
