import { Request, Response } from 'express';
import BoardService from '../services/board.service';

class BoardController {
  static async returnHomeTeamsData(req: Request, res: Response) {
    try {
      const result = await BoardService.getGamehome();
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error });
    }
  }
}

export default BoardController;
