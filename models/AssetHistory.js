module.exports = (sequelize, DataTypes) => {
  const AssetHistory = sequelize.define('AssetHistory', {
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
      type: DataTypes.INTEGER
    },
    action: {
      type: DataTypes.STRING,
      allowNull: false
    },
    actionDate: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    notes: {
      type: DataTypes.TEXT
    },
    amount: {
      type: DataTypes.DECIMAL(10, 2)
    }
  });

  return AssetHistory;
};
