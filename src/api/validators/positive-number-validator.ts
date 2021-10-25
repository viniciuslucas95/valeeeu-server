import { ValidationError } from '../errors';

export class PositiveNumberValidator {
  static validate(number: number) {
    if (number < 0) throw new ValidationError('NumberMustBePositive');
  }
}
