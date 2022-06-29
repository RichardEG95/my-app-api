import express, { Application, RequestHandler, Router } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import CommentFactory from './comments/CommentFactory';

export default class AppFactory {
  private static createRouters(): Router[] {
    return [CommentFactory.create()];
  }

  private static createMiddleware(): RequestHandler[] {
    return [bodyParser.json(), cors()];
  }

  public static create(): Application {
    const app = express();

    AppFactory.createMiddleware().forEach((middleware: RequestHandler): void => {
      app.use(middleware);
    })

    AppFactory.createRouters().forEach((router: Router): void => {
      app.use('/api', router);
    })

    return app;
  }
}
