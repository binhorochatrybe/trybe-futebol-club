import TeamModel from '../database/models/team.model';

class TeamService {
  static async getTeams() {
    const data = await TeamModel.findAll();
    console.log(data);
    return data;
  }

  static async getTeamById(id: number) {
    const team = await TeamModel.findOne({ where: { id } });
    return team;
  }
}

export default TeamService;
