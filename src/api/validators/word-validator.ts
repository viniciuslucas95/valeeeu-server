import { ValidationError } from '../errors';

export class WordValidator {
  static validate(word: string) {
    const formatedString = word.replace(/[^\w]/gimu, '');
    if (formatedString.length < 1)
      throw new ValidationError('InvalidWordFormat');
  }
}
