import { Request, Response, Router } from 'express';
import validateLogin from '../middlewares/testUser';
import LoginController from '../controller/user.controller';
import tokenMiddle from '../middlewares/tokenMiddle';

const router = Router();

router.post('/', validateLogin, (req: Request, res: Response) => LoginController
  .returnToken(req, res));

router.get('/role', tokenMiddle.validateToken, (req: Request, res: Response) => LoginController
  .returnRole(req, res));

export default router;
