const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('historial_medico', {
    idHistorial: {
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
    enfermedades_previas: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    cirugias: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    alergias: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    medicamentos_actuales: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    antecedentes_familiares: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    contacto_emergencia: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    idSintoma: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'sintomas',
        key: 'idSintoma'
      }
    }
  }, {
    sequelize,
    tableName: 'historial_medico',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idHistorial" },
        ]
      },
      {
        name: "fk_historial_sintomas",
        using: "BTREE",
        fields: [
          { name: "idSintoma" },
        ]
      },
      {
        name: "idPaciente",
        using: "BTREE",
        fields: [
          { name: "idPaciente" },
        ]
      },
    ]
  });
};
