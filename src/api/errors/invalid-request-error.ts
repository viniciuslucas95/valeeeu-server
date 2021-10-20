export class InvalidRequestError extends Error {
  constructor(message?: string) {
    super();
    this.name = 'InvalidRequestError';
    this.message = message ?? '';
  }
}
