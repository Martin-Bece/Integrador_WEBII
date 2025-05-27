const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('turnos', {
    idTurno: {
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
    fecha: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    hora: {
      type: DataTypes.TIME,
      allowNull: false
    },
    idEspecialidad: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'especialidades',
        key: 'idEspecialidad'
      }
    },
    idMedico: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'medicos',
        key: 'idMedico'
      }
    },
    estado: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: "Pendiente"
    }
  }, {
    sequelize,
    tableName: 'turnos',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idTurno" },
        ]
      },
      {
        name: "fk_especialidades_turnos",
        using: "BTREE",
        fields: [
          { name: "idEspecialidad" },
        ]
      },
      {
        name: "fk_medico_turnos",
        using: "BTREE",
        fields: [
          { name: "idMedico" },
        ]
      },
      {
        name: "paciente_id",
        using: "BTREE",
        fields: [
          { name: "paciente_id" },
        ]
      },
    ]
  });
};
