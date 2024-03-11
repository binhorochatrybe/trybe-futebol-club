import { Request, Response } from 'express';
import TeamService from '../services/team.service';

class TeamController {
  static async getTeams(_req: Request, res: Response) {
    try {
      const allTeams = await TeamService.getTeams();
      res.status(200).json(allTeams);
    } catch (error) {
      res.status(500).json({ message: 'Deu erro' });
      console.log(error);
    }
  }

  static async getTeamBydID(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const teamByID = await TeamService.getTeamById(Number(id));
      res.status(200).json(teamByID);
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  }
}
export default TeamController;
