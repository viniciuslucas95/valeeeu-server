import { IAccountDto } from '../entities/dtos';
import { ConflictError, InvalidRequestError } from '../errors';
import { BcryptHandler } from '../helpers';
import { IAccountRepository } from '../repositories/interfaces/account-repository';
import { EmailValidator, PasswordValidator } from '../validators';
import { BaseService } from './base-service';

export class AccountService extends BaseService {
  constructor(private readonly repository: IAccountRepository) {
    super(repository, new InvalidRequestError('AccountNotFound'));
  }

  async createAsync(data: IAccountDto): Promise<string> {
    const { email, password } = data;
    const { newId, currentDate } = await this.generateNewBaseModelData();
    await this.repository.createAsync({
      id: newId,
      email: await this.getValidatedAndFormatedEmailAsync(email),
      password: await this.getValidatedAndHashedPasswordAsync(password),
      createdAt: currentDate,
      updatedAt: currentDate,
    });
    return newId;
  }

  async updateAsync(id: string, data: Partial<IAccountDto>) {
    const { email, password } = data;
    const result = await this.repository.getPrivilegedAsync(id);
    if (!result) throw this.notFoundError;
    await this.repository.updateAsync(id, {
      email: email
        ? await this.getValidatedAndFormatedEmailAsync(email)
        : result.email,
      password: password
        ? await this.getValidatedAndHashedPasswordAsync(password)
        : result.password,
      updatedAt: this.getCurrentDate(),
    });
  }

  async deleteAsync(id: string) {
    await this.validateExistenceAsync(id);
    await this.repository.deleteAsync(id);
  }

  private async getValidatedAndFormatedEmailAsync(value: string) {
    EmailValidator.validate(value);
    const formatedEmail = this.formatEmail(value);
    if (await this.repository.checkExistenceByEmailAsync(formatedEmail))
      throw new ConflictError('EmailAlreadyExists');
    return formatedEmail;
  }

  private async getValidatedAndHashedPasswordAsync(value: string) {
    PasswordValidator.validate(value);
    return await this.hashPasswordAsync(value);
  }

  private async hashPasswordAsync(value: string) {
    return await BcryptHandler.hashDataAsync(value);
  }

  private formatEmail(value: string) {
    return value.toLocaleLowerCase();
  }
}
