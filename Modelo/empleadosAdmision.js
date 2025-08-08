const Sequelize = require('sequelize');

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('EmpleadosAdmision', {
    idEmpleado: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    dni: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: "dni"
    },
    nombre: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    apellido: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    correo: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: "correo"
    },
    fecha_nacimiento: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    telefono: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    estado: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    }
  }, {
    sequelize,
    tableName: 'EmpleadosAdmision',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idEmpleado" },
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
      },
    ]
  });
};
