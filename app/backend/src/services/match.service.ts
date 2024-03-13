import MatchModel from '../database/models/matches.model';
import Team from '../database/models/team.model';

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
}
export default MatchesService;
