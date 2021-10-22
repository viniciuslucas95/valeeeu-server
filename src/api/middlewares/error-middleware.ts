import { NextFunction, Request, Response } from 'express';

export class ErrorMiddleware {
  handleError(err: Error, req: Request, res: Response, next: NextFunction) {
    if (err.name === 'ConflictError')
      return res.status(409).json({ error: err });
    if (err.name === 'UnauthorizedError')
      return res.status(401).json({ error: err });
    if (err.name === 'ForbiddenError')
      return res.status(403).json({ error: err });
    if (err.name === 'ServerError') return res.status(500).json({ error: err });
    res.status(400).json({ error: err });
  }
}
