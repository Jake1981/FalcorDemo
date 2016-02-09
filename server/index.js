'use strict';

import falcorExpress from 'falcor-express';
import Router from 'falcor-router';
import express from 'express';
import config from './config';
import path from 'path';
import routes from './routes/routes';

var app = express();

app.use('/model.json', falcorExpress.dataSourceRoute(() => {
    return new Router(routes);
}));

// serve static files from current directory
app.use(express.static(config.clientDir));

var server = app.listen(3000);