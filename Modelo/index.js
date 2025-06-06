const Sequelize = require('sequelize');
const initModels = require('./init-models');

const sequelize = new Sequelize(
  process.env.DB_NAME || 'bd_his',
  process.env.DB_USER || 'root',
  process.env.DB_PASSWORD || '',
  {
    host: process.env.DB_HOST || 'db',
    port: 3306, // <- Asegúrate que aquí está el puerto correcto
    dialect: 'mysql',
    logging: false
  }
);


const models = initModels(sequelize);

models.sequelize = sequelize;
models.Sequelize = Sequelize;

module.exports = models;
