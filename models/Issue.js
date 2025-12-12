module.exports = (sequelize, DataTypes) => {
  const Issue = sequelize.define('Issue', {
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
    issueDate: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    notes: {
      type: DataTypes.TEXT
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  });

  return Issue;
};
