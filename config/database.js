const { Sequelize } = require('sequelize');
const sequelize = process.env.DATABASE_URL
  ? new Sequelize(process.env.DATABASE_URL, {
      dialect: 'postgres',
      protocol: 'postgres',
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false
        }
      },
      logging: false
    })
  : new Sequelize(
      process.env.DB_NAME || 'asset_management',
      process.env.DB_USER || 'postgres',
      process.env.DB_PASSWORD || 'password',
      {
        host: process.env.DB_HOST || 'localhost',
        port: process.env.DB_PORT || 5432,
        dialect: 'postgres',
        logging: false
      }
    );

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
