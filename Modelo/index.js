const Sequelize = require('sequelize');
const initModels = require('./init-models');

const sequelize = new Sequelize(
  'bd_his', 
  'root',   
  '',       
  {
    host: 'localhost', 
    dialect: 'mysql',
    logging: false 
  }
);

const models = initModels(sequelize);

models.sequelize = sequelize;
models.Sequelize = Sequelize;

module.exports = models;