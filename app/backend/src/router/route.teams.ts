import { Request, Response, Router } from 'express';
import TeamController from '../controller/team.controller';

const router = Router();

router.get('/', (req: Request, res: Response) => TeamController.getTeams(req, res));

export default router;
