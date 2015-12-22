import { Router } from 'express';
import falcorExpress from 'falcor-express';
import jwt from 'express-jwt';
import ClientRouter from './client-router';
import serverModel from './server-model';
import { JWT_SECRET } from './config';

const router = Router(); // eslint-disable-line

const authenticate = jwt({
  secret: new Buffer(JWT_SECRET, 'base64'),
  // TODO move audience to config
  audience: 'QcskF7WET5whF3Cs8UvcwIHqlZ8FeqKu'
});

router.all(
  '/model.json',
  authenticate,
  falcorExpress.dataSourceRoute(req => new ClientRouter(serverModel, req.user))
);

export default router;
