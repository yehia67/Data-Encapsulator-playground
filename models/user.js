/* jshint indent: 2 */
const config = require('../config');

module.exports = function(sequelize, DataTypes) {
  let User = sequelize.define('user', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    role: {
      type: DataTypes.ENUM('user', 'admin'),
      allowNull: false,
      defaultValue: 'user',
      validate: {
        setStatus: function(role) {
          if(role == 'admin'){
            this.setDataValue('ethAddress', config.adminAddress);
          }
        }
      }
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    ipfsHash: {
      type: DataTypes.STRING(),
      allowNull: false
    },
    jwtKey: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: true
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    tableName: 'user',
    defaultScope: {
      attributes: {
        exclude: ['password', 'jwtKey']
      },
    },
    scopes: {
      withPassword: {
        attributes: {},
      }
    }
  });
  User.associate = models => {
    User.hasMany(models.Data, {
      foreignKey: 'ownerId'
    });
  };
  return User;
};
