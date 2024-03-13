import { Request, Response } from 'express';
import MatchesService from '../services/match.service';

class MatchController {
  static async getAllMatches(req: Request, res: Response) {
    try {
      if (req.query.inProgress) {
        const inProgress = req.query.inProgress === 'true';
        const progress = await MatchesService.getMatchesInProgress(inProgress);
        return res.status(200).json(progress);
      }
      const teams = await MatchesService.getAllMatches();
      return res.status(200).json(teams);
    } catch (error) {
      res.status(500).json({ error });
    }
  }
}

export default MatchController;
