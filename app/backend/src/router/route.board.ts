import { Request, Response, Router } from 'express';
import BoardController from '../controller/board.controller';

const router = Router();

router.get('/home', (req: Request, res:Response) => BoardController.returnHomeTeamsData(req, res));

export default router;
