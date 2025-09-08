const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('informe_enfermero', {
    id_informe: {
      autoIncrement: true,
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    id_enfermero: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'enfermeros',
        key: 'idEnfermero'
      }
    },
    id_paciente: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'pacientes',
        key: 'idPaciente'
      }
    },
    informe: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    fecha_hora: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    },
    id_especialidad: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'especialidades',
        key: 'idEspecialidad'
      }
    }
  }, {
    sequelize,
    tableName: 'informe_enfermero',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_informe" },
        ]
      },
      {
        name: "id_informe",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_informe" },
        ]
      },
      {
        name: "id_enfermero",
        using: "BTREE",
        fields: [
          { name: "id_enfermero" },
        ]
      },
      {
        name: "id_paciente",
        using: "BTREE",
        fields: [
          { name: "id_paciente" },
        ]
      },
      {
        name: "id_especialidad",
        using: "BTREE",
        fields: [
          { name: "id_especialidad" },
        ]
      },
    ]
  });
};
