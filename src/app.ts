import * as express from 'express';
import { Express, Router, Request, Response, NextFunction } from 'express';
import * as http from 'http';
import * as request from 'request';


const app: Express = express();

const router: Router = express.Router();

router.get('/', (req: Request, res: Response) => {
  res.json({
    message: 'Hi there, welcome to My Api'
  });
});

router.get('/properties', (req: Request, res: Response, next: NextFunction) => {

  const proxy = 'http://localhost:3000/properties';
  const options = { json: true };

  request
    .get(proxy, options)
    .on('error', (err) => {
      console.error('api request failed:', err);
      next(err.message);
    })
    .pipe(res);

});


app.use('/api', router);


const port = process.env.PORT || 9000;
const httpServer = http.createServer(app);

httpServer.listen(port, (err: any) => {
  if (err) {
    console.error(err);
  }
  console.log("App is running on http://localhost: %d", port);
});
