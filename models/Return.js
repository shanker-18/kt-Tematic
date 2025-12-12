module.exports = (sequelize, DataTypes) => {
  const Return = sequelize.define('Return', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    assetId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    employeeId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    returnDate: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    reason: {
      type: DataTypes.STRING,
      allowNull: false
    },
    notes: {
      type: DataTypes.TEXT
    }
  });

  return Return;
};
