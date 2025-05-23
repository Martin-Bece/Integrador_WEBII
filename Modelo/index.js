const Sequelize = require('sequelize');
const db = {};

const sequelize = new Sequelize(
    'bd_his',
    'root',
    '',
    {
        host: 'localhost',
        dialect: 'mysql',
    }
);

Object.keys(db).forEach(modelName => {
    if (db[modelName].asocciate) {
        db[modelName].asocciate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;