import { Request, Response, Router } from 'express';
import TeamController from '../controller/team.controller';

const router = Router();

router.get('/', (req: Request, res: Response) => TeamController.getTeams(req, res));
router.get('/:id', (req: Request, res: Response) => TeamController.getTeamBydID(req, res));
export default router;
