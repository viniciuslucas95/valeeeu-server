import { ConflictError, InvalidRequestError } from '../errors';
import { BcryptHandler } from '../helpers';
import { IAccountRepository } from '../repositories/interfaces';
import { EmailValidator, PasswordValidator } from '../validators';
import { BaseService } from './base-service';

interface IAccountCredentials {
  email: string;
  password: string;
}

export class AccountService extends BaseService {
  private readonly accountNotFoundError = new InvalidRequestError(
    'AccountNotFound'
  );

  constructor(private readonly repository: IAccountRepository) {
    super(repository);
  }

  async createAsync(data: IAccountCredentials): Promise<string> {
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

  async updateAsync(id: string, data: Partial<IAccountCredentials>) {
    const { email, password } = data;
    const credentials = await this.repository.getPrivilegedAsync(id);
    if (!credentials) throw this.accountNotFoundError;
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
    await this.validateExistenceByIdAsync(id);
    await this.repository.deleteAsync(id);
  }

  async getAccountAsync(id: string) {
    const account = await this.repository.getAsync(id);
    if (!account) throw this.accountNotFoundError;
    return account;
  }

  async validateExistenceByIdAsync(
    id: string,
    error: Error = this.accountNotFoundError
  ) {
    if (!(await this.repository.checkExistenceAsync(id))) throw error;
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
