const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('diagnostico', {
    idDiagnostico: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    idPaciente: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    diagnostico: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'diagnostico',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idDiagnostico" },
        ]
      },
      {
        name: "fk_diagnostico_paciente",
        using: "BTREE",
        fields: [
          { name: "idPaciente" },
        ]
      }
    ]
  });
};
