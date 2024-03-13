import MatchModel from '../database/models/matches.model';
import Team from '../database/models/team.model';

type MatchGoals = { homeTeamGoals: string, awayTeamGoals: string };

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
}

export default MatchesService;
