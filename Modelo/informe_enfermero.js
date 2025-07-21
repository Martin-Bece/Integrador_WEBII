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
    id_medico: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'medicos',
        key: 'idMedico'
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
        name: "id_medico",
        using: "BTREE",
        fields: [
          { name: "id_medico" },
        ]
      },
    ]
  });
};
