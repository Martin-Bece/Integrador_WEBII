const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('motivos', {
    idMotivo: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    descripcion: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: "descripcion"
    },
    idEspecialidad: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'especialidades',
        key: 'idEspecialidad'
      }
    }
  }, {
    sequelize,
    tableName: 'motivos',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idMotivo" },
        ]
      },
      {
        name: "descripcion",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "descripcion" },
        ]
      },
      {
        name: "especialidad_motivos",
        using: "BTREE",
        fields: [
          { name: "idEspecialidad" },
        ]
      },
    ]
  });
};
