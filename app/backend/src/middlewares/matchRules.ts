import Teams from '../Interfaces/ITeam';

interface Scoreboard {
  name: string,
  totalPoints: number,
  totalGames: number,
  totalVictories: number,
  totalDraws: number,
  totalLosses: number,
  goalsFavor: number,
  goalsOwn: number,
  goalsBalance: number,
  efficiency: number,
}

interface Points {
  points: number;
  victory: number;
  draw: number;
  loss: number;
}

interface Matches {
  id: number,
  homeTeamId: number,
  homeTeamGoals: number,
  awayTeamId: number,
  awayTeamGoals: number,
  inProgress: boolean,
}

const calculateScoreboardStats = (scoreboard: Scoreboard): Scoreboard => {
  const updatedScoreboard: Scoreboard = {
    ...scoreboard,
    goalsBalance: scoreboard.goalsFavor - scoreboard.goalsOwn,
    efficiency: Number(((scoreboard.totalPoints / (scoreboard.totalGames * 3)) * 100)
      .toFixed(2)),
  };
  return updatedScoreboard;
};

const calculateMatchResult = (teamGoals: number, opponentGoals: number): Points => {
  if (teamGoals < opponentGoals) {
    return { points: 0, victory: 0, draw: 0, loss: 1 };
  }
  if (teamGoals > opponentGoals) {
    return { points: 3, victory: 1, draw: 0, loss: 0 };
  }
  return { points: 1, victory: 0, draw: 1, loss: 0 };
};

const scoreboardFunc = (): Scoreboard => ({
  name: '',
  totalPoints: 0,
  totalGames: 0,
  totalVictories: 0,
  totalDraws: 0,
  totalLosses: 0,
  goalsFavor: 0,
  goalsOwn: 0,
  goalsBalance: 0,
  efficiency: 0,
});

const getHomeTeamScoreboard = (Times: Teams, Partidas: Matches[]): Scoreboard => {
  const scoreboard = scoreboardFunc();
  scoreboard.name = Times.teamName;
  Partidas.forEach((match) => {
    if (Times.id === match.homeTeamId) {
      const result = calculateMatchResult(match.homeTeamGoals, match.awayTeamGoals);
      scoreboard.goalsFavor += match.homeTeamGoals;
      scoreboard.goalsOwn += match.awayTeamGoals;
      scoreboard.totalPoints += result.points;
      scoreboard.totalGames += 1;
      scoreboard.totalVictories += result.victory;
      scoreboard.totalDraws += result.draw;
      scoreboard.totalLosses += result.loss;
    }
  });
  const updatedScoreboard = calculateScoreboardStats(scoreboard);
  return updatedScoreboard;
};

const getAwayTeamScoreboard = (Times: Teams, Partidas: Matches[]): Scoreboard => {
  const scoreboard = scoreboardFunc();
  scoreboard.name = Times.teamName;
  Partidas.forEach((match) => {
    if (Times.id === match.awayTeamId) {
      const response = calculateMatchResult(match.awayTeamGoals, match.homeTeamGoals);
      scoreboard.goalsFavor += match.awayTeamGoals;
      scoreboard.goalsOwn += match.homeTeamGoals;
      scoreboard.totalPoints += response.points;
      scoreboard.totalGames += 1;
      scoreboard.totalVictories += response.victory;
      scoreboard.totalDraws += response.draw;
      scoreboard.totalLosses += response.loss;
    }
  });
  const updatedScoreboard = calculateScoreboardStats(scoreboard);
  return updatedScoreboard;
};

const organizeScoreboard = (scoreboards: Scoreboard[]):Scoreboard[] => scoreboards.sort((a, b) =>
  b.totalPoints - a.totalPoints
  || b.totalVictories - a.totalVictories
  || b.goalsBalance - a.goalsBalance
  || b.goalsFavor - a.goalsFavor
  || b.efficiency - a.efficiency);

export default { getHomeTeamScoreboard, organizeScoreboard, getAwayTeamScoreboard };
