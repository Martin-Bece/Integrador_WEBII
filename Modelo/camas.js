const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('camas', {
    idCama: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    habitacion_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'habitaciones',
        key: 'idHabitacion'
      }
    },
    estado: {
      type: DataTypes.STRING(100),
      allowNull: false,
      defaultValue: "libre"
    },
    activo: {
      type: DataTypes.TINYINT(1),
      allowNull: false,
      defaultValue: 1
    }
  }, {
    sequelize,
    tableName: 'camas',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idCama" },
        ]
      },
      {
        name: "habitacion_id",
        using: "BTREE",
        fields: [
          { name: "habitacion_id" },
        ]
      },
    ]
  });
};
