const { where } = require('sequelize');
const db = require('../Modelo');
const { listarUsuarios, usuariosPorRol, buscarUsuarioPorId, crearUsuario, editarUsuario, eliminarUsuario, obtenerUsuarioPorDNI } = require('./usuariosController');
const { listarPacientes } = require('./PacientesController');
const { obtenerMedicos, obtenerMedicoPorID } = require('./medicosController');
const { obtenerEspecialidades } = require('./especialidadesController');
const { obtenerEnfermeros } = require('./enfermeriaController');
const { obtenerCamas } = require('./camasController');
const { obtenerHabitaciones } = require('./habitacionesController');
const { obtenerAdmisiones } = require('./admisionesController');
const { obtenerMutuales } = require('./mutualesController');
const { obtenerMotivos } = require('./motivosController');

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

async function renderAdminPaciente(req, res, datosAdicionales = {}) {
  
  const pacientes = await listarPacientes();

  return res.render('AdminPaciente', { pacientes })

}

async function renderformPaciente(req, res, datosAdicionales = {}) {
  let paciente = null;

  if (req.params.id) {
    paciente = await db.pacientes.findByPk(req.params.id)
  }

  const mutuales = await obtenerMutuales();

  res.render('formAdminPaciente', { paciente, mutuales });
}

async function renderAdminMedico(req, res, datosAdicionales = {}) {
  
  const medicos = await obtenerMedicos();

  const especialidades = await obtenerEspecialidades();

  return res.render('AdminMedico', { medicos, especialidades })

}

async function renderformMedico(req, res, datosAdicionales = {}) {
  let medico = null;

  if (req.params.id) {
    medico = await obtenerMedicoPorID(req.params.id);
  }

  const especialidades = await obtenerEspecialidades();

  res.render('formAdminMedico', { medico, especialidades });
}

async function renderAdminEmpleadoAdm(req, res, datosAdicionales = {}) {
  
  const empleados = await db.EmpleadosAdmision.findAll();

  return res.render('AdminAdmision', { empleados })

}

async function renderformEmpAdmision(req, res, datosAdicionales = {}) {
  let empleado = null;

  if (req.params.id) {
    empleado = await db.EmpleadosAdmision.findByPk(req.params.id);
  }

  res.render('formAdminEmpAdmision', { empleado });
}

async function renderAdminEspecialidad(req, res, datosAdicionales = {}) {
  
  const especialidades = await obtenerEspecialidades();

  return res.render('AdminEspecialidad', { especialidades })

}

async function renderformEspecialidad(req, res, datosAdicionales = {}) {
  let especialidad = null;

  if (req.params.id) {
    especialidad = await db.especialidades.findByPk(req.params.id);
  }

  res.render('formAdminEspecialidad', { especialidad });
}

async function renderAdminEnfermeros(req, res, datosAdicionales = {}) {
  
  const enfermeros = await obtenerEnfermeros();

  return res.render('AdminEnfermero', { enfermeros });

}

async function renderformEnfermero(req, res, datosAdicionales = {}) {
  let enfermero = null;

  if (req.params.id) {
    enfermero = await db.enfermeros.findByPk(req.params.id);
  }

  res.render('formAdminEnfermero', { enfermero });
}

async function renderAdminCamas(req, res, datosAdicionales = {}) {
  
  const camas =  await db.camas.findAll({
    include: [
      {
        model: db.habitaciones,
        as: 'habitacion',
        attributes: ['numero']
      }
    ]
  });
  return res.render('AdminCamas', { camas })
}

async function renderformCamas(req, res, datosAdicionales = {}) {
  let cama = null;

  if (req.params.id) {
    cama = await db.camas.findByPk(req.params.id)
  }

  const habitaciones = await obtenerHabitaciones();

  res.render('formAdminCama', { cama, habitaciones });
}

async function renderAdminHabitaciones(req, res, datosAdicionales = {}) {
  
  const habitaciones = await db.habitaciones.findAll({
      include: [
        {
          model: db.unidades,
          as: 'unidad',
          attributes: ['nombre']
        },
        {
          model: db.camas,
          as: 'camas',
          attributes: ['idCama']
        }
      ]
    });

    return res.render('AdminHabitacion', { habitaciones });

}

async function renderformHabitacion(req, res, datosAdicionales = {}) {
  let habitacion = null;

  if (req.params.id) {
    habitacion = await db.habitaciones.findByPk(req.params.id);
  }

  const unidades = await db.unidades.findAll();
  const alas = await db.alas.findAll();

  res.render('formAdminHabitacion', { habitacion, unidades, alas });
}

async function renderAdminUnidades(req, res, datosAdicionales = {}) {
  
  const unidades = await db.unidades.findAll();

  return res.render('AdminUnidades', { unidades });

}

async function renderformUnidad(req, res, datosAdicionales = {}) {
  let unidad = null;

  if (req.params.id) {
    unidad = await db.unidades.findByPk(req.params.id);
  }

  res.render('formAdminUnidad', { unidad });
}

async function renderAdminAdmisiones(req, res, datosAdicionales = {}) {
  
  const admisiones = await obtenerAdmisiones();

  return res.render('AdminAdmisiones', { admisiones });
}

async function renderformAdmision(req, res, datosAdicionales = {}) {
  let admision = null;

  if (req.params.id) {
    admision = await db.admisiones.findByPk(req.params.id);
  }

  const pacientes = await db.pacientes.findAll();
  const motivos = await obtenerMotivos();
  const origenes = await db.origenes.findAll();
  const habitaciones = await obtenerHabitaciones();
  let camas = [];
  if (admision) {
    camas = await db.camas.findAll({
      where: { habitacion_id: admision.habitacion_id }
    });
  }

  res.render('formAdminAdmision', { admision, pacientes, motivos, origenes, habitaciones, camas });
}

async function renderAdminMutuales(req, res, datosAdicionales = {}) {
  
  const mutuales = await obtenerMutuales();

  return res.render('AdminMutuales', { mutuales });

}

async function renderformMutual(req, res, datosAdicionales = {}) {
  let mutual = null;

  if (req.params.id) {
    mutual = await db.mutuales.findByPk(req.params.id);
  }

  res.render('formAdminMutual', { mutual });
}

module.exports = {
  renderListaUsuarios, renderFormUsuario, renderFormCambiarContraseña, postCambiarContraseña, crearUsuarioNuevo, actualizarUsuarioExistente, renderConfirmarEliminar, eliminarUsuarioLista, renderResumen, renderAdminPaciente, renderAdminMedico, renderAdminEmpleadoAdm, renderAdminEspecialidad, renderAdminEnfermeros, renderAdminCamas, renderAdminAdmisiones, renderAdminUnidades, renderAdminHabitaciones, renderAdminMutuales, renderformPaciente, renderformMedico, renderformEmpAdmision, renderformAdmision, renderformUnidad, renderformHabitacion, renderformCamas, renderformEnfermero, renderformEspecialidad, renderformMutual
};