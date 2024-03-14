import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import { Response } from 'superagent';
import UserModel from '../database/models/user.model';
import Match from '../database/models/matches.model';
import MatchesService from '../services/match.service';
chai.use(chaiHttp);

const { expect } = chai;

const matches = [
  {
    "id": 1,
    "homeTeamId": 16,
    "homeTeamGoals": 1,
    "awayTeamId": 8,
    "awayTeamGoals": 1,
    "inProgress": false,
    "homeTeam": {
      "teamName": "São Paulo"
    },
    "awayTeam": {
      "teamName": "Grêmio"
    }
  },
  {
    "id": 41,
    "homeTeamId": 16,
    "homeTeamGoals": 2,
    "awayTeamId": 9,
    "awayTeamGoals": 0,
    "inProgress": true,
    "homeTeam": {
      "teamName": "São Paulo"
    },
    "awayTeam": {
      "teamName": "Internacional"
    }
  }
]

describe('Testes LeaderBoard', () => {
  let chaiHttpResponse: Response;

  afterEach(sinon.restore);

  it('Verifica se retorna a classificação da equipe com base nas partidas jogadas em casa', async () => {
    chaiHttpResponse = await chai.request(app).get('/leaderboard/home');

    expect(chaiHttpResponse.status).to.equal(200);
    expect(chaiHttpResponse.body).to.be.an('array');
    expect(chaiHttpResponse.body).not.to.be.empty;
  })

  it('Verifica se retorna a classificação da equipe com base nas partidas jogadas fora de casa', async () => {
    chaiHttpResponse = await chai.request(app).get('/leaderboard/away');

    expect(chaiHttpResponse.status).to.equal(200);
    expect(chaiHttpResponse.body).to.be.an('array');
    expect(chaiHttpResponse.body).not.to.be.empty;
  })

  it('Retorna um erro 404 se a rota não existir', async () => {
    chaiHttpResponse = await chai.request(app).get('/leaderboard/nonexistent');

    expect(chaiHttpResponse.status).to.equal(404);
  });
  it('Verifica se o login não é feito com dados no body inválidos', async () => {
    chaiHttpResponse = await chai.request(app).post('/login').send({});

    expect(chaiHttpResponse.status).to.equal(400)
    expect(chaiHttpResponse.body).to.deep.equal({ "message": "All fields must be filled" })
  });
  it('Verifica se o login não foi feito com senha errada', async () => {
    const body = {
      "email": "admin@admin.com",
      "password": "euadmin"
    }

    chaiHttpResponse = await chai.request(app).post('/login').send(body);

    expect(chaiHttpResponse.status).to.equal(401)
    expect(chaiHttpResponse.body).to.deep.equal({ message: "Invalid email or password" })
  });


  it('Checks that login is not done with email not found.', async () => {
    sinon.stub(UserModel, "findByPk").resolves(null);
    const body = {
      "email": "eu@admin.com",
      "password": "secret_admin"
    }

    chaiHttpResponse = await chai.request(app).post('/login').send(body);

    expect(chaiHttpResponse.status).to.equal(401)
    expect(chaiHttpResponse.body).to.deep.equal({ message: "Invalid email or password" })
  });

  it('Deve retornar todas as partidas com um get em /matches', async () => {

    const mockTimes: any = matches;

    sinon.stub(Match, 'findAll').resolves(mockTimes);

    const res = await MatchesService.getAllMatches();
    expect(res).to.deep.equal(mockTimes);
    sinon.restore();
  });

})
