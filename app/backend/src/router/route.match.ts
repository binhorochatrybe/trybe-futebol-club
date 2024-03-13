import { Request, Response, Router } from 'express';
import MatchController from '../controller/match.controller';
import tokenMiddle from '../middlewares/tokenMiddle';

const router = Router();

router
  .get('/', (req: Request, res: Response) => MatchController
    .getAllMatches(req, res));

router
  .patch('/:id/finish', tokenMiddle.validateToken, (req: Request, res: Response) => MatchController
    .returnFinishedMatch(req, res));

router
  .patch('/:id', tokenMiddle.validateToken, (req: Request, res: Response) => MatchController
    .updateMatchById(req, res));

router
  .post('/', tokenMiddle.validateToken, (req: Request, res: Response) => MatchController
    .returnCreatedMatch(req, res));
export default router;
