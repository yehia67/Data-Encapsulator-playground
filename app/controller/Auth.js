const config = require('../../config');
const db = require('../../models');
const {registerUser,login,logout} = require('../services/auth');


const { controller } = require('../middleware/controller');

module.exports = {
  register: controller(registerUser),
  login: controller(login),
  logout:controller(logout)
};

