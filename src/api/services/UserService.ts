import { ConflictError, InvalidRequestError, ValidationError } from '../errors';
import { IUserCreationDto } from '../entities/dtos/user';
import isEmail from 'validator/lib/isEmail';
import { User } from '../entities/models';
import { BcryptHandler } from '../helpers';
import { IUserRepository } from '../repositories/userRepository/interfaces';
import { BaseService } from './BaseService';

export class UserService extends BaseService<User> {
  private readonly emailAlreadyExistsError = new ConflictError(
    'EmailAlreadyExists'
  );
  private readonly userNotFoundError = new InvalidRequestError('UserNotFound');
  private readonly wrongCredentialsError = new InvalidRequestError(
    'WrongCredentials'
  );

  constructor(private readonly userRepository: IUserRepository) {
    super(userRepository);
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
      email,
      password: hashedPassword,
      createdAt: currentDate,
      updatedAt: currentDate,
    };

    await this.userRepository.createAsync(newUser);
    return newId;
  }

  async updateAsync(id: string, data: Partial<IUserCreationDto>) {
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
    const user = await this.findUserByIdAsync(id);
    await this.userRepository.updateAsync(id, {
      email: updatedEmail ?? user.email,
      password: updatedPassword ?? user.password,
      updatedAt: this.getCurrentDate(),
    });
  }

  async deleteAsync(id: string) {
    await this.findUserByIdAsync(id);
    await this.userRepository.deleteAsync(id);
  }

  async findAsync(data: IUserCreationDto) {
    const { email, password } = data;
    this.validateEmail(email);
    this.validatePassword(password);
    const user = await this.findUserByEmailAsync(email);
    await this.checkPasswordAsync(password, user.password);
    return user.id;
  }

  private async checkEmailExistanceAsync(email: string) {
    const result = await this.userRepository.checkEmailExistenceAsync(email);
    if (result) throw this.emailAlreadyExistsError;
  }

  private async findUserByEmailAsync(email: string) {
    const user = await this.userRepository.findByEmailAsync(email);
    if (!user) throw this.userNotFoundError;
    return user;
  }

  private async findUserByIdAsync(id: string) {
    const user = await this.userRepository.findByIdAsync(id);
    if (!user) throw this.userNotFoundError;
    return user;
  }

  private async hashPasswordAsync(password: string) {
    const bcryptHandler = new BcryptHandler();
    return bcryptHandler.hashDataAsync(password);
  }

  private async checkPasswordAsync(password: string, hashedPassword: string) {
    const bcryptHandler = new BcryptHandler();
    const result = await bcryptHandler.compareDataAsync(
      password,
      hashedPassword
    );
    if (!result) throw this.wrongCredentialsError;
  }

  private validateEmail(email: string) {
    if (!isEmail(email)) throw new ValidationError('WrongEmailFormat');
  }

  private validatePassword(password: string) {
    if (password.length < 6) throw new ValidationError('PasswordTooShort');
  }
}
