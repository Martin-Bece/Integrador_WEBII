const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('enfermero', {
    idEnfermero: {
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
      unique: "dni"
    },
    matricula: {
      type: DataTypes.STRING(30),
      allowNull: false,
      unique: "matricula"
    },
    telefono: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    fecha_nacimiento: {
      type: DataTypes.DATEONLY,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'enfermero',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idEnfermero" },
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
        name: "matricula",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "matricula" },
        ]
      },
    ]
  });
};
