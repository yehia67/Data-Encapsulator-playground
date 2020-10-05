'use strict';
const config = require('../config');
const Sequelize = require('sequelize');
let sequelize = new Sequelize(config.dbName, config.dbUserName, config.dbPassword, {
  host: config.dbHost,
  dialect: 'mysql'
});

let db = {
  User : sequelize.import('./user'),
  Data: sequelize.import('./data')
};

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

//sequelize.sync({ alter: true })
module.exports = db;
