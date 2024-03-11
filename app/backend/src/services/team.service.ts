import TeamModel from '../database/models/team.model';

class TeamService {
  static async getTeams() {
    const data = await TeamModel.findAll();
    console.log(data);
    return data;
  }
}

export default TeamService;
