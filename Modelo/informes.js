const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('informes', {
    idInforme: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    idPaciente: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'pacientes',
        key: 'idPaciente'
      }
    },
    idEstudio: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'estudios',
        key: 'idEstudio'
      }
    },
    idMedico: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'medicos',
        key: 'idMedico'
      }
    },
    fechaInforme: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    },
    resultado: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'informes',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idInforme" },
        ]
      },
      {
        name: "idPaciente",
        using: "BTREE",
        fields: [
          { name: "idPaciente" },
        ]
      },
      {
        name: "idEstudio",
        using: "BTREE",
        fields: [
          { name: "idEstudio" },
        ]
      },
      {
        name: "idMedico",
        using: "BTREE",
        fields: [
          { name: "idMedico" },
        ]
      },
    ]
  });
};
