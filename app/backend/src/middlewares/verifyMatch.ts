import { Request, Response, NextFunction } from 'express';
import Team from '../database/models/team.model';

const verifyIfMatchAlreadyExists = async (req: Request, res: Response, next: NextFunction) => {
  const { homeTeamId, awayTeamId } = req.body;
  const homeExists = await Team.findByPk(homeTeamId);
  const awayExists = await Team.findByPk(awayTeamId);
  if (!homeExists || !awayExists) {
    return res.status(404)
      .json({ message: 'There is no team with such id!' });
  }
  if (homeExists.dataValues.teamName === awayExists.dataValues.teamName) {
    return res.status(422)
      .json({ message: 'It is not possible to create a match with two equal teams' });
  }
  next();
};

export default verifyIfMatchAlreadyExists;
