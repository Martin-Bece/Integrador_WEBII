const Sequelize = require('sequelize');
const bcrypt = require('bcrypt');

module.exports = function(sequelize, DataTypes) {
  const Usuario = sequelize.define('usuarios', {
    idUsuario: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    usuario: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    contrasea: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    rol: {
      type: DataTypes.ENUM('medico', 'admision', 'enfermero', 'admin'),
      allowNull: false
    },
    dni: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: true
    }
  }, {
    sequelize,
    tableName: 'usuarios',
    timestamps: false,
    hooks: {
      beforeCreate: async (usuario) => {
        if (usuario.contrasea) {
          const salt = await bcrypt.genSalt(10);
          usuario.contrasea = await bcrypt.hash(usuario.contrasea, salt);
        }
      },
      beforeUpdate: async (usuario) => {
        if (usuario.changed('contrasea')) {
          const salt = await bcrypt.genSalt(10);
          usuario.contrasea = await bcrypt.hash(usuario.contrasea, salt);
        }
      }
    }
  });

  Usuario.prototype.validarContraseña = async function(contraseñaIngresada) {
    return await bcrypt.compare(contraseñaIngresada, this.contrasea);
  };

  return Usuario;
};
