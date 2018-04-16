/**
 * Server setup
 */

import express from 'express';
import path from 'path';
import './config/database';
import middlewaresConfig from './config/middlewares';
import ApiRoutes from './routes/router';

var app = express();

middlewaresConfig(app);
app.use('/api', ApiRoutes);

// app.use();

module.exports = app;
