import express, {NextFunction, Request, Response} from 'express';
import config from './config';
import Logger from './services/logger';
import {createConnection} from "typeorm";
import ErrnoException = NodeJS.ErrnoException;
import {isCelebrate} from "celebrate";

const port = config.port || 3010;

(async () => {
  process.on('unhandledRejection', (reason:ErrnoException, promise:Promise<any>) => {
    console.log('Unhandled Rejection at:', reason.stack || reason)
    promise.catch(() => process.exit(1));
  })

  await createConnection();
  const app: express.Application = express();
  await require('./loaders').default({app: app});

  app.get('/api', (req: express.Request, res: express.Response) => {
    res.status(200).send({status: 'pong'}).end();
  });

  // TODO: Move middleware somewhere else.
  app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    console.error(err);
    if (isCelebrate(err)) {
      // TODO: Details is an array, map errors from it.
      return res.status(422).json({
        msg: err.joi.details[0].message
      });
    }

    if (res.headersSent) {
      return next(err);
    }

    return res.status(err.status || 500).render('500');
  });

  await app.listen(port, () => {
    Logger.info(`
      ####################################
      🛡️  Server listening on port: ${config.port} 🛡️
      ####################################
    `);
  });
})().catch((e) => {
  console.error(e);
});
