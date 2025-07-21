const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('plan_de_cuidados', {
    id_plan: {
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
    intervenciones_inmediatas: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    medicamentos: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    tratamiento: {
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
    tableName: 'plan_de_cuidados',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_plan" },
        ]
      },
      {
        name: "id_plan",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_plan" },
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
    ]
  });
};
