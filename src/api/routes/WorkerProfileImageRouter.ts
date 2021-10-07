import { Router } from 'express';
import { WorkerImageController } from '../controllers/WorkerImageController';

export class WorkerProfileImageRouter {
  static create() {
    const router = Router();
    router.post('/workers/images', WorkerImageController.create);
    return router;
  }
}
