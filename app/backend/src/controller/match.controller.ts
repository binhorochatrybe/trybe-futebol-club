import { Request, Response } from 'express';
import MatchesService from '../services/match.service';

class MatchController {
  static async getAllMatches(req: Request, res: Response) {
    try {
      const teams = await MatchesService.getAllMatches();
      res.status(200).json(teams);
    } catch (error) {
      res.status(500).json({ error });
    }
  }
}

export default MatchController;
