import { ValidationError } from '../errors';

export class WordValidator {
  static validate(name: string) {
    const formatedString = name.replace(/[^\w]/gimu, '');
    if (formatedString.length < 1)
      throw new ValidationError('InvalidNameFormat');
  }
}
