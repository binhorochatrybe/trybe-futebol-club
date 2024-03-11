import { Model, DataTypes } from 'sequelize';
import db from './index';
import Team from './team.model';

class Match extends Model {
  public id!: number;
  public homeTeamId!: number;
  public awayTeamId!: number;
  public homeTeamGoals!: number;
  public awayTeamGoals!: number;
  public inProgress!: boolean;
}

Match.init({
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  homeTeamId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'home_team_id',
  },
  homeTeamGoals: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'home_team_goals',
  },
  awayTeamId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'away_team_id',
  },
  awayTeamGoals: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'away_team_goals',
  },
  inProgress: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
    field: 'in_progress',
  },
}, {
  sequelize: db,
  tableName: 'matches',
  modelName: 'Match',
  timestamps: false,
});

Team.hasMany(
  Match,
  {
    foreignKey: 'homeTeamId', as: 'HomeMatches',
  },
);
Team.hasMany(
  Match,
  {
    foreignKey: 'awayTeamId', as: 'AwayMatches',
  },
);
Match.belongsTo(
  Team,
  {
    foreignKey: 'homeTeamId', as: 'homeTeam',
  },
);
Match.belongsTo(
  Team,
  {
    foreignKey: 'awayTeamId', as: 'awayTeam',
  },
);

export default Match;
