import { Request, Response, Router } from 'express';
import MatchController from '../controller/match.controller';

const router = Router();

router.get('/', (req: Request, res: Response) => MatchController.getAllMatches(req, res));

export default router;
