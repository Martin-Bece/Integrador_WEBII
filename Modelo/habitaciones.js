const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('habitaciones', {
    idHabitacion: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    ala_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'alas',
        key: 'idAla'
      }
    },
    unidad_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'unidades',
        key: 'idUnidad'
      }
    },
    numero: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    capacidad: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    activo: {
      type: DataTypes.TINYINT(1),
      allowNull: false,
      defaultValue: 1
    }
  }, {
    sequelize,
    tableName: 'habitaciones',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idHabitacion" },
        ]
      },
      {
        name: "fk_habitacion_unidad",
        using: "BTREE",
        fields: [
          { name: "unidad_id" },
        ]
      },
      {
        name: "ala_id",
        using: "BTREE",
        fields: [
          { name: "ala_id" },
        ]
      },
    ]
  });
};
