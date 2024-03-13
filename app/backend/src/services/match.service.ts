import MatchModel from '../database/models/matches.model';
import Team from '../database/models/team.model';

type MatchGoals = { homeTeamGoals: string, awayTeamGoals: string };

export type NewMatch = {
  homeTeamId: number,
  awayTeamId: number,
  homeTeamGoals: number,
  awayTeamGoals: number
};

class MatchesService {
  static async getAllMatches() {
    const matches = await MatchModel.findAll({
      include: [
        { model: Team, as: 'homeTeam', attributes: { exclude: ['id'] } },
        { model: Team, as: 'awayTeam', attributes: { exclude: ['id'] } },
      ],
    });
    return matches;
  }

  static async getMatchesInProgress(progress: boolean) {
    const matches = await MatchModel.findAll({
      where: { inProgress: progress },
      include: [
        { model: Team, as: 'homeTeam' },
        { model: Team, as: 'awayTeam' },
      ],
    });
    return matches;
  }

  static async finishMatch(id: number) {
    await MatchModel.update(
      { inProgress: false },
      { where: { id } },
    );
  }

  static async updateMatch(id: number, match: MatchGoals) {
    await MatchModel.update(
      { homeTeamGoals: match.homeTeamGoals, awayTeamGoals: match.awayTeamGoals },
      { where: { id } },
    );
  }

  static async createMatch(body: NewMatch) {
    const match = await MatchModel.create({
      homeTeamId: body.homeTeamId,
      homeTeamGoals: body.homeTeamGoals,
      awayTeamId: body.awayTeamId,
      awayTeamGoals: body.awayTeamGoals,
      inProgress: true,
    });
    return match;
  }
}

export default MatchesService;
