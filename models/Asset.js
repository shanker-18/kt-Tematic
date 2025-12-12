module.exports = (sequelize, DataTypes) => {
  const Asset = sequelize.define('Asset', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    serialNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    make: {
      type: DataTypes.STRING
    },
    model: {
      type: DataTypes.STRING
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    purchaseDate: {
      type: DataTypes.DATE
    },
    purchasePrice: {
      type: DataTypes.DECIMAL(10, 2)
    },
    branch: {
      type: DataTypes.STRING
    },
    status: {
      type: DataTypes.ENUM('available', 'issued', 'scrapped'),
      defaultValue: 'available'
    },
    isObsolete: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  });

  return Asset;
};
