const Sequelize = require('sequelize');

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('administradores', {
    idAdministrador: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nombre: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    apellido: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    dni: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: true
    },
    direccion: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    correo: {
      type: DataTypes.STRING(150),
      allowNull: false,
      unique: true
    }
  }, {
    sequelize,
    tableName: 'administradores',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idAdministrador" },
        ]
      },
      {
        name: "dni",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "dni" },
        ]
      },
      {
        name: "correo",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "correo" },
        ]
      }
    ]
  });
};
