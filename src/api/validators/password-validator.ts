import { ValidationError } from '../errors';

export class PasswordValidator {
  static validate(password: string) {
    if (password.length < 6) throw new ValidationError('PasswordTooShort');
  }
}
