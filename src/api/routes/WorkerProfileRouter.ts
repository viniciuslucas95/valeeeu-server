import { Router } from 'express';
import { WorkerController } from '../controllers';

export class WorkerProfileRouter {
  static create() {
    const router = Router();
    router.post('/workers', WorkerController.create);
    router.patch('/workers', WorkerController.update);
    return router;
  }
}
