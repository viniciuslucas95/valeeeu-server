import { Router } from 'express';
import { WorkerController } from '../controllers';

export class WorkerProfileRouter {
  static create() {
    const router = Router();
    const url = '/workers';
    router.post(url, WorkerController.create);
    return router;
  }
}
