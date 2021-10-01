import {
  ConflictError,
  InvalidRequestError,
  ServerError,
  ValidationError,
} from '../errors';
import {
  IUserCreationDto,
  IUserLogInDto,
  IUserUpdateDto,
} from '../entities/dtos/user';
import isEmail from 'validator/lib/isEmail';
import { User } from '../entities/models';
import { BcryptHandler } from '../helpers';
import { IUserRepository } from '../repositories/userRepository/interfaces';
import { BaseService } from './BaseService';

export class UserService extends BaseService<User> {
  constructor(private readonly repository: IUserRepository) {
    super(repository);
  }

  async createAsync(data: IUserCreationDto) {
    const { email, password } = data;
    this.validateEmail(email);
    this.validatePassword(password);
    await this.checkEmailExistanceAsync(email);
    const { newId, currentDate } = await this.generateBaseModel();
    const hashedPassword = await this.hashPasswordAsync(password);
    const newUser: User = {
      id: newId,
      email: this.formatEmail(email),
      password: hashedPassword,
      createdAt: currentDate,
      updatedAt: currentDate,
    };
    await this.repository.createAsync(newUser);
    return newId;
  }

  async updateAsync(
    id: string,
    data: Partial<Omit<IUserUpdateDto, 'updatedAt'>>
  ) {
    const { email, password } = data;
    let updatedEmail = email ? email : undefined;
    let updatedPassword: string | undefined = undefined;
    if (password) {
      this.validatePassword(password);
      updatedPassword = await this.hashPasswordAsync(password);
    }
    if (email) {
      this.validateEmail(email);
      await this.checkEmailExistanceAsync(email);
    }
    const user = await this.findByIdAsync(id);
    await this.repository.updateAsync(id, {
      email: this.formatEmail(updatedEmail ?? user.email),
      password: updatedPassword ?? user.password,
      updatedAt: this.getCurrentDate(),
    });
  }

  async deleteAsync(id: string) {
    await this.checkExistanceByIdAsync(id);
    await this.repository.deleteAsync(id);
  }

  async checkExistanceByIdAsync(id: string) {
    const result = await this.repository.checkExistanceByIdAsync(id);
    if (!result) throw new ServerError('UserNotFound');
  }

  async logInAsync(data: IUserLogInDto) {
    const { email, password } = data;
    this.validateEmail(email);
    this.validatePassword(password);
    const user = await this.findByEmailAsync(email);
    await this.checkPasswordAsync(password, user.password);
    return user.id;
  }

  private async findByIdAsync(id: string) {
    const user = await this.repository.findByIdAsync(id);
    if (!user) throw new ServerError('UserNotFound');
    return user;
  }

  private async checkEmailExistanceAsync(email: string) {
    const result = await this.repository.checkExistanceByEmailAsync(email);
    if (result) throw new ConflictError('EmailAlreadyExists');
  }

  private async hashPasswordAsync(password: string) {
    const bcryptHandler = new BcryptHandler();
    return bcryptHandler.hashDataAsync(password);
  }

  private async findByEmailAsync(email: string) {
    const user = await this.repository.findByEmailAsync(
      this.formatEmail(email)
    );
    if (!user) throw new InvalidRequestError('WrongCredentials');
    return user;
  }

  private async checkPasswordAsync(password: string, hashedPassword: string) {
    const bcryptHandler = new BcryptHandler();
    const result = await bcryptHandler.compareDataAsync(
      password,
      hashedPassword
    );
    if (!result) throw new InvalidRequestError('WrongCredentials');
  }

  private validateEmail(email: string) {
    if (!isEmail(email)) throw new ValidationError('WrongEmailFormat');
  }

  private validatePassword(password: string) {
    if (password.length < 6) throw new ValidationError('PasswordTooShort');
  }

  private formatEmail(email: string) {
    return email.toLowerCase();
  }
}
