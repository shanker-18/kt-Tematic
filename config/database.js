const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('asset_management', 'postgres', 'manian@18', {
  host: 'localhost',
  dialect: 'postgres',
  logging: false,
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Employee = require('../models/Employee')(sequelize, Sequelize);
db.AssetCategory = require('../models/AssetCategory')(sequelize, Sequelize);
db.Asset = require('../models/Asset')(sequelize, Sequelize);
db.Issue = require('../models/Issue')(sequelize, Sequelize);
db.Return = require('../models/Return')(sequelize, Sequelize);
db.AssetHistory = require('../models/AssetHistory')(sequelize, Sequelize);

db.Asset.belongsTo(db.AssetCategory, { foreignKey: 'categoryId' });
db.AssetCategory.hasMany(db.Asset, { foreignKey: 'categoryId' });

db.Issue.belongsTo(db.Employee, { foreignKey: 'employeeId' });
db.Issue.belongsTo(db.Asset, { foreignKey: 'assetId' });

db.Return.belongsTo(db.Employee, { foreignKey: 'employeeId' });
db.Return.belongsTo(db.Asset, { foreignKey: 'assetId' });

db.AssetHistory.belongsTo(db.Asset, { foreignKey: 'assetId' });
db.AssetHistory.belongsTo(db.Employee, { foreignKey: 'employeeId' });

module.exports = db;
