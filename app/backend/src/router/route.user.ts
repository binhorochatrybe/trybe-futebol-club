import { Request, Response, Router } from 'express';
import validateLogin from '../middlewares/testUser';
import LoginController from '../controller/user.controller';

const router = Router();

router.post('/', validateLogin, (req: Request, res: Response) => LoginController
  .returnToken(req, res));

export default router;
