const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('sintomas', {
    idSintoma: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    descripcion: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    prioridad: {
      type: DataTypes.ENUM('alta','media','baja'),
      allowNull: false
    },
    idMotivo: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'motivos',
        key: 'idMotivo'
      }
    }
  }, {
    sequelize,
    tableName: 'sintomas',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idSintoma" },
        ]
      },
      {
        name: "fk_sintomas_motivos",
        using: "BTREE",
        fields: [
          { name: "idMotivo" },
        ]
      },
    ]
  });
};
