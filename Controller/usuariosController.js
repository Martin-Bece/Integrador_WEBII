const { where } = require('sequelize');
const db = require('../Modelo');

async function listarUsuarios() {
    return await db.usuarios.findAll();
}

async function usuariosPorRol(rol) {
  if (rol === 'todos') {
    return listarUsuarios();
  }
  return await db.usuarios.findAll({
    where: { rol },
    attributes: ['idUsuario', 'usuario', 'rol', 'dni']
  });
}

async function buscarUsuarioPorId(id) {
  return await db.usuarios.findByPk(id, {
    attributes: ['idUsuario', 'usuario', 'rol', 'dni']
  });
}

async function crearUsuario(data) {
  return await db.usuarios.create(data);
}

async function editarUsuario(id, data) {
  return await db.usuarios.update(data, {
    where: { idUsuario: id }
  });
}

async function eliminarUsuario(id) {
  return await db.usuarios.destroy({
    where: { idUsuario: id }
  });
}

async function obtenerUsuarioPorDNI(dni) {
  try {
    const usuario = await db.usuarios.findOne({
      where: { dni }
    });
    return usuario;
  } catch (error) {
    console.error('Error al buscar usuario por DNI:', error);
    throw error;
  }
}

module.exports = {listarUsuarios, usuariosPorRol, buscarUsuarioPorId, crearUsuario, editarUsuario, eliminarUsuario, obtenerUsuarioPorDNI}