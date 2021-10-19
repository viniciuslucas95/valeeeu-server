import isEmail from 'validator/lib/isEmail';
import { ValidationError } from '../errors';

export class EmailValidator {
  static validate(email: string) {
    if (!isEmail(email)) throw new ValidationError('InvalidEmailFormat');
  }
}
