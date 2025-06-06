const Sequelize = require('sequelize');
const initModels = require('./init-models');

const sequelize = process.env.DATABASE_URL
  ? new Sequelize(process.env.DATABASE_URL, {
      dialect: 'mysql',
      logging: false,
    })
  : new Sequelize(
      process.env.DB_NAME,
      process.env.DB_USER,
      process.env.DB_PASSWORD,
      {
        host: process.env.DB_HOST,
        dialect: 'mysql',
        logging: false,
      }
    );


const models = initModels(sequelize);

models.sequelize = sequelize;
models.Sequelize = Sequelize;

module.exports = models;
