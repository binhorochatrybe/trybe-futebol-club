import * as express from 'express';
import 'express-async-errors';
import TeamRouter from './router/route.teams';
import UserRouter from './router/route.user';
import MatchRouter from './router/route.match';
import BoardRouter from './router/route.board';

import errorMiddleware from './middlewares/errorMiddleware';

class App {
  public app: express.Express;

  constructor() {
    this.app = express();

    this.config();

    // Não remover essa rota
    this.app.get('/', (req, res) => res.json({ ok: true }));
    this.app.use('/teams', TeamRouter);
    this.app.use('/login', UserRouter);
    this.app.use('/matches', MatchRouter);
    this.app.use('/leaderboard', BoardRouter);
    // Não remova esse middleware de erro, mas fique a vontade para customizá-lo
    // Mantenha ele sempre como o último middleware a ser chamado
    this.app.use(errorMiddleware);
  }

  private config():void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(express.json());
    this.app.use(accessControl);
  }

  public start(PORT: string | number): void {
    this.app.listen(PORT, () => console.log(`Running on port ${PORT}`));
  }
}

export { App };

// Essa segunda exportação é estratégica, e a execução dos testes de cobertura depende dela
export const { app } = new App();
