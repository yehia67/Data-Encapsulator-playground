const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cors = require('cors');
const trimRequest = require('trim-request');
const passport = require('passport');
const logger = require('morgan');
const debug = require('debug')('app:express');


const { ServerError } = require('../serverConfig');

const { authRouter } = require('./router/auth');
const { ipfsRouter } = require('./router/ipfs');


const app = express();
app.use(helmet({ crossdomain: false }));
app.use(passport.initialize());
app.use(cors());
app.use(bodyParser.json({ limit: '50mb', strict: false }));
app.use(express.urlencoded({ extended: false }));
app.use('/', express.static((path.join(__dirname, '../public'))));
app.use('/table', express.static((path.join(__dirname, '../public'))));
app.use(trimRequest.all);
app.use(logger('dev'));
app.set('views', '../public');
app.set('view engine', 'ejs');

// eslint-disable-next-line no-unused-vars
app.get('/', (req, res, next) => {
  res.json({ message: 'server is Up and Running!' });
});

app.use('/auth', authRouter);
app.use('/ipfs', ipfsRouter);


// 404 handler
app.use('*', (req, res, next) => {
  next(new ServerError('API_NOT_FOUND', 404));
});

// error handler
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  if (!err.status) {
    debug(err);
    process.exit(0);
  }
  debug('Custom Server Error >', err.message);
  res.status(err.status).json({ message: err.message, status: err.status });
});

module.exports = { app };
