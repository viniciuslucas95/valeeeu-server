export class ServerError extends Error {
  constructor(message?: string) {
    super();
    this.name = 'ServerError';
    this.message = message ?? '';
  }
}
