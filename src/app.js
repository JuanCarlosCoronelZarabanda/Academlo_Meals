import express from 'express';
import { enableCors } from './config/plugins/cors.plugin.js';
import { globalHandleError } from './common/errors/error.controller.js';
import { AppError } from './common/errors/appError.js';
import { router } from './routes/index.js';

const app = express();
const ACCEPTED_ORIGINS = ['http://localhost:8080'];

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
enableCors(app, ACCEPTED_ORIGINS);
app.use('/api/v1', router);
app.use('*', (req, res, next) => {
  return next(new AppError(`${req.originalUrl} not found`, 404));
});
app.use(globalHandleError);

export default app;
