import { Router } from 'express';
import { WorkerImageController } from '../controllers/WorkerImageController';

export class WorkerProfileImageRouter {
  static create() {
    const router = Router();
    const url = '/images/workers';
    router.post(url, WorkerImageController.create);
    return router;
  }
}
