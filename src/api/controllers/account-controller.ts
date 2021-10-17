import { Request, Response, NextFunction } from 'express';

export class AccountController {
  static async create(req: Request, res: Response, next: NextFunction) {
    try {
    } catch (err) {
      next(err);
    }
  }
}
