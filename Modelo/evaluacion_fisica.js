const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('evaluacion_fisica', {
    id_evaluacion: {
      autoIncrement: true,
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    id_paciente: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'pacientes',
        key: 'idPaciente'
      }
    },
    presion_arterial: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    frecuencia_respiratoria: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    temperatura_corporal: {
      type: DataTypes.DECIMAL(4,1),
      allowNull: true
    },
    color_piel: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    observaciones: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    fecha_hora: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    }
  }, {
    sequelize,
    tableName: 'evaluacion_fisica',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_evaluacion" },
        ]
      },
      {
        name: "id_evaluacion",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_evaluacion" },
        ]
      },
      {
        name: "id_paciente",
        using: "BTREE",
        fields: [
          { name: "id_paciente" },
        ]
      },
    ]
  });
};
