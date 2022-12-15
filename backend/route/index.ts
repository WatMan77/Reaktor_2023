import express from 'express';
import { router } from './first';

const routes = express.Router();

routes.use(router);

export { routes }