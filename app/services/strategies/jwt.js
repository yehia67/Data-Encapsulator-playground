const { Strategy } = require('passport-jwt');
const { verifyToken } = require('./util');
const { jwtSecret } = require('../../../config');
const db = require('../../../models');

const { ServerError } = require('../../../serverConfig');

const JWTStrategy = Strategy;

const strategyOptions = {
  jwtFromRequest: req => req.get('Authorization'),
  secretOrKey: jwtSecret,
  passReqToCallback: true
}

const verifyCallback = async (req, jwtPayload, done) => {
  const user = await db.User.scope('withKeys').findOne({ where: { id: jwtPayload.user.id } }, { raw: true });
  if (!user) return done(new ServerError('no such user', 404));

  let { err, status } = verifyToken(jwtPayload.user.subToken, user.jwtKey);
  if (err) return done(new ServerError(err, status));
  delete user.jwtKey;

  req.user = user
  return done(null, user);
}

exports.jwtStrategy = new JWTStrategy(strategyOptions, verifyCallback);
