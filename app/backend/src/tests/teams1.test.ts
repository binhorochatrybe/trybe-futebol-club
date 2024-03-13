import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import TeamModel from '../database/models/team.model';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testes de Times', () => {
  let chaiHttpResponse;

  afterEach(() => {
    sinon.restore();
  });

  
  const teamsData = [
    {
      "id": 1,
      "teamName": "Avaí/Kindermann"
    },
    {
      "id": 2,
      "teamName": "Bahia"
    },
    {
      "id": 3,
      "teamName": "Botafogo"
    },
  ];

  const teamData = {
    "id": 5,
    "teamName": "Cruzeiro"
  };

  const teams = teamsData.map(team => TeamModel.build(team));
  const team = TeamModel.build(teamData);

  it('Deve retornar todos os times', async () => {
    sinon.stub(TeamModel, "findAll").resolves(teams);
    chaiHttpResponse = await chai.request(app).get('/teams');
    const teamsDataValues = teams.map(team => team.dataValues);
    console.log(teamsDataValues);
    
    
    expect(chaiHttpResponse.status).to.equal(200);
    expect(chaiHttpResponse.body).to.deep.equal(teamsDataValues);
  });

  it('Deve retornar um time pelo ID', async () => {
    sinon.stub(TeamModel, "findByPk").resolves(team);
    chaiHttpResponse = await chai.request(app).get('/teams/5');
    console.log(team.dataValues);
    
    expect(chaiHttpResponse.status).to.equal(200);
    expect(chaiHttpResponse.body).to.deep.equal(team.dataValues);
  });

});