import { ValidationError } from '../errors';

export class RatingValidator {
  static validate(rating: number) {
    if (rating < 1 || rating > 5)
      throw new ValidationError('InvalidRatingRange(1-5)');
  }
}
