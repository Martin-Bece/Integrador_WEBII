const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('unidades', {
    idUnidad: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nombre: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: "nombre"
    }
  }, {
    sequelize,
    tableName: 'unidades',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idUnidad" },
        ]
      },
      {
        name: "nombre",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "nombre" },
        ]
      },
    ]
  });
};
