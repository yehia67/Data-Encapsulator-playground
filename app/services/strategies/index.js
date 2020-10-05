const passport = require('passport');

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

const { jwtStrategy } = require('./jwt');

passport.use(jwtStrategy);

module.exports = {
  passport,
  jwt: passport.authenticate('jwt'),
};