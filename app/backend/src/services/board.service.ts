import MatchesService from './match.service';
import TeamService from './team.service';
import MatchRule from '../middlewares/matchRules';

interface Match {
  id: number;
  homeTeamId: number;
  awayTeamId: number;
  homeTeamGoals: number;
  awayTeamGoals: number;
  inProgress: boolean;
}

class Board {
  private static mapMatches(matches: Match[]): Match[] {
    return matches.map((match) => ({
      id: match.id,
      homeTeamId: match.homeTeamId,
      homeTeamGoals: match.homeTeamGoals,
      awayTeamId: match.awayTeamId,
      awayTeamGoals: match.awayTeamGoals,
      inProgress: match.inProgress,
    }));
  }

  static async getGamehome() {
    const teams = await TeamService.getTeams();
    console.log('----------------------------------- HEREEEEEEE');
    console.log(teams);
    const matchesCompleted = await MatchesService.getMatchesInProgress(false);
    const defaultMatch = this.mapMatches(matchesCompleted);
    const results = teams.map((team) => MatchRule.getHomeTeamScoreboard(team, defaultMatch));
    return MatchRule.organizeScoreboard(results);
  }
}

export default Board;
