import { Id } from '../data-types/types';
import { IAccountCreationDto } from '../entities/dtos';
import { ConflictError } from '../errors';
import { BcryptHandler } from '../helpers';
import { IAccountRepository } from '../repositories/interfaces';
import { EmailValidator, PasswordValidator } from '../validators';
import { BaseService } from './base-service';

export class AccountService extends BaseService {
  constructor(private readonly repository: IAccountRepository) {
    super(repository);
  }

  async createAsync(data: IAccountCreationDto): Promise<Id> {
    const { email, password } = await this.validateAndFormatCredentialsAsync(
      data
    );
    const { newId, currentDate } = await this.generateNewBaseModelData();
    await this.repository.createAsync({
      id: newId,
      email,
      password,
      createdAt: currentDate,
      updatedAt: currentDate,
    });
    return newId;
  }

  private async validateAndFormatCredentialsAsync(
    data: IAccountCreationDto
  ): Promise<IAccountCreationDto> {
    const { email, password } = data;
    EmailValidator.validate(email);
    PasswordValidator.validate(password);
    const lowerCaseEmail = email.toLocaleLowerCase();
    if (await this.repository.checkExistanceByEmailAsync(lowerCaseEmail))
      throw new ConflictError('EmailAlreadyExists');
    const hashedPassword = await BcryptHandler.hashDataAsync(password);
    return { email: lowerCaseEmail, password: hashedPassword };
  }
}
