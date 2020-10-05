module.exports = function(sequelize, DataTypes) {
  let Data = sequelize.define('data', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
      },
    ownerId: {
      type: DataTypes.INTEGER(11),
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
    tableName: 'data',
  });
  Data.associate = models => {
    Data.belongsTo(models.User, {
        foreignKey: 'ownerId'
    });
  };
  return Data;
};
