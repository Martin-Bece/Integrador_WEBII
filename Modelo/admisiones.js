const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('admisiones', {
    idAdmision: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    paciente_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'pacientes',
        key: 'idPaciente'
      }
    },
    motivo_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'motivos',
        key: 'idMotivo'
      }
    },
    origen_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'origenes',
        key: 'idOrigen'
      }
    },
    fecha_admision: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    },
    fecha_alta: {
      type: DataTypes.DATE,
      allowNull: true
    },
    estado: {
      type: DataTypes.ENUM('Activa', 'Alta'),
      allowNull: false,
      defaultValue: "Activa"
    },
    habitacion_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'habitaciones',
        key: 'idHabitacion'
      }
    },
    cama_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'camas',
        key: 'idCama'
      }
    }
  }, {
    sequelize,
    tableName: 'admisiones',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idAdmision" },
        ]
      },
      {
        name: "fk_admision_habitacion",
        using: "BTREE",
        fields: [
          { name: "habitacion_id" },
        ]
      },
      {
        name: "fk_admision_cama",
        using: "BTREE",
        fields: [
          { name: "cama_id" },
        ]
      },
      {
        name: "paciente_id",
        using: "BTREE",
        fields: [
          { name: "paciente_id" },
        ]
      },
      {
        name: "motivo_id",
        using: "BTREE",
        fields: [
          { name: "motivo_id" },
        ]
      },
      {
        name: "origen_id",
        using: "BTREE",
        fields: [
          { name: "origen_id" },
        ]
      },
    ]
  });
};
