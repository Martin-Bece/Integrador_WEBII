const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('pacientes_estudios', {
    idPaciente: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'pacientes',
        key: 'idPaciente'
      }
    },
    idEstudio: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'estudios',
        key: 'idEstudio'
      }
    },
    fecha: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      primaryKey: true
    },
    descripcion: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'pacientes_estudios',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idPaciente" },
          { name: "idEstudio" },
          { name: "fecha" },
        ]
      },
      {
        name: "idEstudio",
        using: "BTREE",
        fields: [
          { name: "idEstudio" },
        ]
      },
    ]
  });
};
