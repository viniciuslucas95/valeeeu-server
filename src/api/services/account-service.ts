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
    const credentials = await this.repository.getPrivilegedAsync(id);
    if (!credentials) throw this.notFoundError;
    await this.repository.updateAsync(id, {
      email: email
        ? await this.getValidatedAndFormatedEmailAsync(email)
        : credentials.email,
      password: password
        ? await this.getValidatedAndHashedPasswordAsync(password)
        : credentials.password,
      updatedAt: this.getCurrentDate(),
    });
  }

  async deleteAsync(id: string) {
    await this.validateExistenceAsync(id);
    await this.repository.deleteAsync(id);
  }

  private async getValidatedAndFormatedEmailAsync(email: string) {
    EmailValidator.validate(email);
    const formatedEmail = this.formatEmail(email);
    if (await this.repository.checkExistenceByEmailAsync(formatedEmail))
      throw new ConflictError('EmailAlreadyExists');
    return formatedEmail;
  }

  private async getValidatedAndHashedPasswordAsync(password: string) {
    PasswordValidator.validate(password);
    return await this.hashPasswordAsync(password);
  }

  private async hashPasswordAsync(password: string) {
    return await BcryptHandler.hashDataAsync(password);
  }

  private formatEmail(email: string) {
    return email.toLocaleLowerCase();
  }
}
