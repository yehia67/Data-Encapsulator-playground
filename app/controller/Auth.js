const config = require('../../config');
const db = require('../../models');
const auth = require('../services/auth');

exports.register = async (req, res, next) => {
  let { email } = req.body;
  let foundUser = await db.User.findOne({ where: { email } });
  if (foundUser) res.json({ err: 'user with this email already exist', status: 409 });
  const response = await auth.registerUser(req);
  res.json(response);
};

exports.login = async (req, res, next) => {
   const response = await auth.login(req);
   res.json(response);
  };

exports.logout = async (req, res, next) => {
    let { id } = req.user;
    await db.User.update({ jwtKey: generateJwtKey() }, { where: { id } });
    return {
        message: 'logout successful. previous tokens are now expired',
        data: true
    }
}