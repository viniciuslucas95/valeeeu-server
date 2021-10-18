import { Id } from '../data-types/types';
import { IAccountCredentialsDto, IIdDto } from '../entities/dtos';
import { ConflictError, InvalidRequestError } from '../errors';
import { BcryptHandler } from '../helpers';
import { IAccountRepository } from '../repositories/interfaces';
import { EmailValidator, PasswordValidator } from '../validators';
import { BaseService } from './base-service';

export class AccountService extends BaseService {
  private readonly accountNotFoundError = new InvalidRequestError(
    'AccountNotFound'
  );

  constructor(private readonly repository: IAccountRepository) {
    super(repository);
  }

  async createAsync(data: IAccountCredentialsDto): Promise<IIdDto> {
    const { email, password } = data;
    const { newId, currentDate } = await this.generateNewBaseModelData();
    await this.repository.createAsync({
      id: newId,
      email: await this.getValidatedAndFormatedEmailAsync(email),
      password: await this.getValidatedAndHashedPasswordAsync(password),
      createdAt: currentDate,
      updatedAt: currentDate,
    });
    return { id: newId };
  }

  async updateAsync(id: Id, data: Partial<IAccountCredentialsDto>) {
    const { email, password } = data;
    const credentials = await this.repository.getCredentialsByIdAsync(id);
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

  async deleteAsync(id: Id) {
    await this.validateExistenceByIdAsync(id);
    await this.repository.deleteAsync(id);
  }

  async getAccountAsync(id: Id) {
    const email = await this.repository.getEmailByIdAsync(id);
    if (!email) throw this.accountNotFoundError;
    return email;
  }

  async validateExistenceByIdAsync(
    id: Id,
    error: Error = this.accountNotFoundError
  ) {
    if (!(await this.repository.checkExistenceByIdAsync(id))) throw error;
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
