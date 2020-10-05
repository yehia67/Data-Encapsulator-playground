const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const crypto = require('crypto-js');
const { jwtSecret } = require('../../../config');

const signToken = (user, secret = jwtSecret) => {
  return jwt.sign({ user }, secret, {
    expiresIn: '30d',
  });
}

const verifyToken = (token, secret = jwtSecret) => {
  let user;
  try {
    user = jwt.verify(token, secret);
  } catch (error) {
    return { err: 'token expired', status: 403 }
  }
  return { user };
}

const hashPassword = async password => {
  if (!password) {
    throw new Error('Password was not provided');
  }

  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
}

const verifyPassword = async (candidate, actual) => {
  return await bcrypt.compare(candidate, actual);
}

const generateJwtKey = () => {
  return crypto.lib.WordArray.random(16).toString();
}

module.exports = { 
  signToken,
  hashPassword,
  verifyPassword,
  generateJwtKey,
  verifyToken,
};
