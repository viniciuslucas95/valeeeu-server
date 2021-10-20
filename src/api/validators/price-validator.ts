import { ValidationError } from '../errors';

export class PriceValidator {
  static validate(price: number) {
    if (price < 0) throw new ValidationError('PriceMustBePositive');
  }
}
