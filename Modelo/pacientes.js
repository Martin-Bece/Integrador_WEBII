const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('pacientes', {
    idPaciente: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nombre: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    apellido: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    dni: {
      type: DataTypes.BIGINT,
      allowNull: true,
      unique: "dni"
    },
    fecha_nacimiento: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    sexo: {
      type: DataTypes.CHAR(1),
      allowNull: true
    },
    telefono: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    direccion: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    mutual_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'mutuales',
        key: 'idMutual'
      }
    }
  }, {
    sequelize,
    tableName: 'pacientes',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idPaciente" },
        ]
      },
      {
        name: "dni",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "dni" },
        ]
      },
      {
        name: "fk_paciente_mutual",
        using: "BTREE",
        fields: [
          { name: "mutual_id" },
        ]
      },
    ]
  });
};
