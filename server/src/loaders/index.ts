import {Application, Request, Response, NextFunction} from 'express';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import cors from 'cors';
import {errors, CelebrateError, isCelebrate} from 'celebrate';
import Logger from '../services/logger';

export default async ({app}: { app: Application }) => {
  app.use(helmet());
  app.use(bodyParser.json());
  app.use(cors());
  app.use(morgan('combined'));
  // app.use(errors(CelebrateError()));
  // app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  //   console.log(err);
  //   if (isCelebrate(err)) {
  //     console.log('celebreate!!');
  //   }
  //   if (res.headersSent) {
  //     return next(err);
  //   }
  //
  //   return res.status(err.status || 500).render('500');
  // });

  app.enable('trust proxy');
  Logger.info('Loaders loaded.');
};
