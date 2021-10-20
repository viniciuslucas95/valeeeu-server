import { ValidationError } from '../errors';

export class PictureValidator {
  static validate(picture: string) {
    const formatedString = picture.replace(/[^a-z0-9+\/]/gim, '');
    if (formatedString.length < 1)
      throw new ValidationError('InvalidNameFormat');
  }
}
