const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const path = require('path');
const db = require('./config/database');

const app = express();


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'asset-management-secret-key',
  resave: false,
  saveUninitialized: true
}));


app.use('/', require('./routes/index'));
app.use('/employees', require('./routes/employees'));
app.use('/assets', require('./routes/assets'));
app.use('/categories', require('./routes/categories'));
app.use('/stock', require('./routes/stock'));
app.use('/issue', require('./routes/issue'));
app.use('/return', require('./routes/return'));
app.use('/scrap', require('./routes/scrap'));
app.use('/history', require('./routes/history'));


const PORT = process.env.PORT || 3000;

db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log('='.repeat(50));
    console.log('✓ Asset Management System Started Successfully!');
    console.log('='.repeat(50));
    console.log(`Server running on: http://localhost:${PORT}`);
    console.log(`Database connected: PostgreSQL`);
    console.log('='.repeat(50));
    console.log('Press Ctrl+C to stop the server');
  });
}).catch(err => {
  console.error('\n' + '='.repeat(50));
  console.error('✗ DATABASE CONNECTION FAILED');
  console.error('='.repeat(50));
  console.error('Error:', err.message);
  console.error('\nPlease ensure:');
  console.error('1. PostgreSQL is installed and running');
  console.error('2. Database "asset_management" exists');
  console.error('3. Credentials in config/database.js are correct');
  console.error('\nTo create database, run in PostgreSQL:');
  console.error('   CREATE DATABASE asset_management;');
  console.error('\nFor more help, see DATABASE_SETUP.md');
  console.error('='.repeat(50) + '\n');
  process.exit(1);
});

module.exports = app;
