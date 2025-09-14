const { where } = require('sequelize');
const db = require('../Modelo');
const { listarUsuarios, usuariosPorRol, buscarUsuarioPorId, crearUsuario, editarUsuario, eliminarUsuario, obtenerUsuarioPorDNI } = require('./usuariosController');

async function renderListaUsuarios(req, res, datosAdicionales = {}) {
  try {
    const rol = req.query.rol || 'todos';
    let usuarios;

    if (rol === 'todos') {
      usuarios = await listarUsuarios();
    } else {
      usuarios = await usuariosPorRol(rol);
    }

    res.render('listaUsuarios', {
      usuarios,
      rolSeleccionado: rol, 
      ...datosAdicionales
    });
  } catch (error) {
    console.error('Error al listar usuarios:', error);
    res.status(500).send('Error interno al cargar los usuarios');
  }
}

async function renderFormUsuario(req, res) {
  let usuario = null;

  if (req.params.id) {
    usuario = await buscarUsuarioPorId(req.params.id);
  }

  res.render('formUsuario', { usuario });
}

async function crearUsuarioNuevo(req, res) {
  const datosUsuario = {
    usuario: req.body.usuario,
    contrasea: req.body.contrasea,
    dni: req.body.dni,
    rol: req.body.rol
  };

  if (!datosUsuario.usuario || !datosUsuario.contrasea || !datosUsuario.dni || !datosUsuario.rol) {
    return renderFormUsuario(req, res, {
      error: 'Por favor, complete todos los campos obligatorios.',
      usuario: datosUsuario
    });
  }

  try {
    const existente = await obtenerUsuarioPorDNI(datosUsuario.dni);
    if (existente) {
      return renderFormUsuario(req, res, {
        error: 'Ya existe un usuario con ese DNI.',
        usuario: datosUsuario
      });
    }

    await crearUsuario(datosUsuario);
    res.redirect('/admin/usuarios');
  } catch (err) {
    console.error(err);
    return renderFormUsuario(req, res, {
      error: 'Error interno al crear el usuario.',
      usuario: datosUsuario
    });
  }
}

async function actualizarUsuarioExistente(req, res) {
  const idUsuario = req.params.id;
  const datosUsuario = {
    usuario: req.body.usuario,
    dni: req.body.dni,
    rol: req.body.rol
  };

  if (!datosUsuario.usuario || !datosUsuario.dni || !datosUsuario.rol) {
    return renderFormUsuario(req, res, {
      error: 'Por favor, complete todos los campos obligatorios.',
      usuario: datosUsuario
    });
  }

  try {
    const usuarioExistente = await buscarUsuarioPorId(idUsuario);
    if (!usuarioExistente) {
      return res.redirect('/admin/usuarios');
    }

    const dniDuplicado = await obtenerUsuarioPorDNI(datosUsuario.dni);
    if (dniDuplicado && dniDuplicado.idUsuario != idUsuario) {
      return renderFormUsuario(req, res, {
        error: 'Otro usuario ya tiene ese DNI.',
        usuario: datosUsuario
      });
    }

    await editarUsuario(idUsuario, datosUsuario);
    res.redirect('/admin/usuarios');
  } catch (err) {
    console.error(err);
    return renderFormUsuario(req, res, {
      error: 'Error interno al actualizar el usuario.',
      usuario: datosUsuario
    });
  }
}

async function renderFormCambiarContraseña(req, res, datosAdicionales = {}) {
  try {
    const idUsuario = req.params.id;
    const usuario = await db.usuarios.findByPk(idUsuario);
    if (!usuario) {
      return res.redirect('/admin/usuarios');
    }

    res.render('cambiarContraseña', {
      usuario,
      ...datosAdicionales
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al cargar el formulario de cambio de contraseña.');
  }
}

async function postCambiarContraseña(req, res) {
  const idUsuario = req.params.id;
  const { contraseaActual, contraseaNueva, confirmarContrasea } = req.body;

  try {
    const usuario = await db.usuarios.findByPk(idUsuario);
    if (!usuario) {
      return res.redirect('/admin/usuarios');
    }

    if (!await usuario.validarContraseña(contraseaActual)) {
      return renderFormCambiarContraseña(req, res, {
        error: 'La contraseña actual es incorrecta'
      });
    }

    if (contraseaNueva !== confirmarContrasea) {
      return renderFormCambiarContraseña(req, res, {
        error: 'La nueva contraseña y la confirmación no coinciden'
      });
    }

    usuario.contrasea = contraseaNueva;
    await usuario.save();

    return renderFormCambiarContraseña(req, res, {
      exito: 'Contraseña cambiada correctamente'
    });

  } catch (err) {
    console.error(err);
    return renderFormCambiarContraseña(req, res, {
      error: 'Ocurrió un error al cambiar la contraseña'
    });
  }
}

async function renderConfirmarEliminar(req, res) {
  const idUsuario = req.params.id;
  try {
    const usuario = await buscarUsuarioPorId(idUsuario);
    if (!usuario) {
      return res.redirect('/admin/usuarios');
    }
    res.render('ConfirmarEliminar', { usuario });
  } catch (err) {
    console.error(err);
    res.status(500).send('Ocurrió un error al cargar la página de confirmación');
  }
}

async function eliminarUsuarioLista(req, res) {
  const idUsuario = req.params.id;

  try {
    const usuario = await buscarUsuarioPorId(idUsuario);
    if (!usuario) {
      return res.redirect('/admin/usuarios');
    }

    await eliminarUsuario(idUsuario);

    res.redirect('/admin/usuarios');
  } catch (err) {
    console.error(err);
    res.status(500).send('Ocurrió un error al eliminar el usuario');
  }
}

async function renderResumen(req, res) {
  try {
    const totalPacientes = await db.pacientes.count();
    const totalTurnos = await db.turnos.count({ where: { estado: 'Pendiente' } });
    const totalInformes = await db.informes.count();
    const camasOcupadas = await db.camas.count({ where: { estado: 'ocupada' } });
    const totalMedicos = await db.usuarios.count({ where: { rol: 'medico' } });
    const totalEnfermeros = await db.usuarios.count({ where: { rol: 'enfermero' } });
    const totalAdmision = await db.usuarios.count({ where: { rol: 'admision' } });
    const altas = await db.admisiones.count({ where: { estado: 'Alta' } });
    const activas = await db.admisiones.count({ where: { estado: 'Activa' } });



    res.render('Resumen', {
      totalPacientes,
      totalTurnos,
      totalInformes,
      camasOcupadas,
      totalMedicos,
      totalEnfermeros,
      totalAdmision,
      altas,
      activas
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error al cargar el resumen administrativo');
  }
}

module.exports = {
  renderListaUsuarios, renderFormUsuario, renderFormCambiarContraseña, postCambiarContraseña, crearUsuarioNuevo, actualizarUsuarioExistente, renderConfirmarEliminar, eliminarUsuarioLista, renderResumen
};