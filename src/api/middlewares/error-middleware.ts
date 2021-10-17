import { NextFunction, Request, Response } from 'express';

export class ErrorMiddleware {
  handleError(err: Error, req: Request, res: Response, next: NextFunction) {
    // if (err.name === 'ConflictError') return res.status(409).json(err);
    // if (err.name === 'ForbiddenError') return res.status(403).json(err);
    // if (err.name === 'ServerError') return res.status(500).json(err);
    console.error(err);
    res.status(400).json(err);
  }
}
