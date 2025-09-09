const Sequelize = require('sequelize');

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('informes_alta', {
    idInforme: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    admision_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'admisiones',
        key: 'idAdmision'
      }
    },
    diagnostico_final: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    medicacion: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    recomendaciones: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    observaciones: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    fecha_informe: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    }
  }, {
    sequelize,
    tableName: 'informes_alta',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idInforme" }
        ]
      },
      {
        name: "fk_admision_informe",
        using: "BTREE",
        fields: [
          { name: "admision_id" }
        ]
      }
    ]
  });
};
