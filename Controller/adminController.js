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

  const mutuales = await db.mutuales.findAll({ where: {activo: 1} });

  res.render('formAdminPaciente', { paciente, mutuales });
}

async function AdminAltaoBajaPaciente(req, res) {
  try {
    const idPaciente = req.params.id;
    const paciente = await db.pacientes.findByPk(idPaciente);

    if (!paciente) {
      return res.status(404).send('Paciente no encontrado');
    }

    paciente.activo = paciente.activo ? 0 : 1;
    await paciente.save();

    res.redirect('/admin/pacientes');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al cambiar el estado del paciente');
  }
}

async function AdmincrearPaciente(req, res) {
  const paciente = {
    dni: req.body.dni,
    nombre: req.body.nombre,
    apellido: req.body.apellido,
    fecha_nacimiento: req.body.fecha_nacimiento,
    sexo: req.body.sexo,
    telefono: req.body.telefono,
    direccion: req.body.direccion,
    mutual_id: req.body.mutual_id || null,
    activo: req.body.activo ? 1 : 0
  };

  if (!paciente.dni || !paciente.nombre || !paciente.apellido || !paciente.fecha_nacimiento || !paciente.sexo) {
    return renderformPaciente(req, res, { error: 'Complete los campos obligatorios.', paciente });
  }

  try {
    const existente = await db.pacientes.findOne({ where: { dni: paciente.dni } });
    if (existente) {
      return renderformPaciente(req, res, { error: 'Ya existe un paciente con ese DNI.', paciente });
    }

    await db.pacientes.create(paciente);
    res.redirect('/admin/pacientes');
  } catch (err) {
    console.error(err);
    return renderformPaciente(req, res, { error: 'Error interno al crear paciente.', paciente });
  }
}

async function AdminactualizarPaciente(req, res) {
  const idPaciente = req.params.id;
  const paciente = {
    dni: req.body.dni,
    nombre: req.body.nombre,
    apellido: req.body.apellido,
    fecha_nacimiento: req.body.fecha_nacimiento,
    sexo: req.body.sexo,
    telefono: req.body.telefono,
    direccion: req.body.direccion,
    mutual_id: req.body.mutual_id || null,
    activo: req.body.activo ? 1 : 0
  };

  if (!paciente.dni || !paciente.nombre || !paciente.apellido || !paciente.fecha_nacimiento || !paciente.sexo) {
    return renderformPaciente(req, res, { error: 'Complete los campos obligatorios.', paciente });
  }

  try {
    const pacienteExistente = await db.pacientes.findByPk(idPaciente);
    if (!pacienteExistente) return res.redirect('/admin/pacientes');

    const dniDuplicado = await db.pacientes.findOne({ where: { dni: paciente.dni } });
    if (dniDuplicado && dniDuplicado.idPaciente != idPaciente) {
      return renderformPaciente(req, res, { error: 'Otro paciente ya tiene ese DNI.', paciente });
    }

    await db.pacientes.update(paciente, { where: { idPaciente } });
    res.redirect('/admin/pacientes');
  } catch (err) {
    console.error(err);
    return renderformPaciente(req, res, { error: 'Error interno al actualizar paciente.', paciente });
  }
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

  const especialidades = await db.especialidades.findAll({ where: { activo: 1 } });

  res.render('formAdminMedico', { medico, especialidades });
}

async function AdminAltaoBajaMedico(req, res) {
  try {
    const idMedico = req.params.id;
    const medico = await db.medicos.findByPk(idMedico);

    if (!medico) {
      return res.status(404).send('Medico no encontrado');
    }

    medico.activo = medico.activo ? 0 : 1;
    await medico.save();

    res.redirect('/admin/medicos');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al cambiar el estado del medico');
  }
}

async function AdmincrearMedico(req, res) {
  const medico = {
    nombre: req.body.nombre,
    apellido: req.body.apellido,
    dni: req.body.dni,
    matricula: req.body.matricula,
    telefono: req.body.telefono,
    idEspecialidad: req.body.idEspecialidad,
    activo: req.body.activo ? 1 : 0
  };

  if (!medico.nombre || !medico.apellido || !medico.dni || !medico.matricula || !medico.idEspecialidad) {
    return renderformMedico(req, res, { error: 'Complete los campos obligatorios.', medico });
  }

  try {
    const existente = await db.medicos.findOne({ 
      where: {
        [db.Sequelize.Op.or]: [
          { dni: medico.dni },
          { matricula: medico.matricula }
        ]
      } 
    });

    if (existente) {
      return renderformMedico(req, res, { error: 'Ya existe un médico con ese DNI o matrícula.', medico });
    }

    await db.medicos.create(medico);
    res.redirect('/admin/medicos');
  } catch (err) {
    console.error(err);
    return renderformMedico(req, res, { error: 'Error interno al crear el médico.', medico });
  }
}

async function AdminactualizarMedico(req, res) {
  const idMedico = req.params.id;
  const medico = {
    nombre: req.body.nombre,
    apellido: req.body.apellido,
    dni: req.body.dni,
    matricula: req.body.matricula,
    telefono: req.body.telefono,
    idEspecialidad: req.body.idEspecialidad,
    activo: req.body.activo ? 1 : 0
  };

  if (!medico.nombre || !medico.apellido || !medico.dni || !medico.matricula || !medico.idEspecialidad) {
    return renderformMedico(req, res, { error: 'Complete los campos obligatorios.', medico });
  }

  try {
    const medicoExistente = await db.medicos.findByPk(idMedico);
    if (!medicoExistente) return res.redirect('/admin/medicos');

    const duplicado = await db.medicos.findOne({ 
      where: {
        [db.Sequelize.Op.or]: [
          { dni: medico.dni },
          { matricula: medico.matricula }
        ],
        idMedico: { [db.Sequelize.Op.ne]: idMedico }
      }
    });

    if (duplicado) {
      return renderformMedico(req, res, { error: 'Otro médico ya tiene ese DNI o matrícula.', medico });
    }

    await db.medicos.update(medico, { where: { idMedico } });
    res.redirect('/admin/medicos');
  } catch (err) {
    console.error(err);
    return renderformMedico(req, res, { error: 'Error interno al actualizar el médico.', medico });
  }
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

async function AdminAltaoBajaEmpAdmision(req, res) {
  try {
    const idEmpleado = req.params.id;
    const empleado = await db.EmpleadosAdmision.findByPk(idEmpleado);

    if (!empleado) {
      return res.status(404).send('Empleado de Admision no encontrado');
    }

    empleado.activo = empleado.activo ? 0 : 1;
    await empleado.save();

    res.redirect('/admin/empleados-admision');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al cambiar el estado del empleado de admision');
  }
}

async function AdmincrearEmpAdmision(req, res) {
  const empleado = {
    dni: req.body.dni,
    nombre: req.body.nombre,
    apellido: req.body.apellido,
    correo: req.body.correo,
    fecha_nacimiento: req.body.fecha_nacimiento,
    telefono: req.body.telefono,
    estado: req.body.estado ? 1 : 0
  };

  if (!empleado.dni || !empleado.nombre || !empleado.apellido || !empleado.correo || !empleado.fecha_nacimiento) {
    return renderformEmpAdmision(req, res, { error: 'Complete los campos obligatorios.', empleado });
  }

  try {
    const existente = await db.EmpleadosAdmision.findOne({ where: { dni: empleado.dni } });
    if (existente) {
      return renderformEmpAdmision(req, res, { error: 'Ya existe un empleado con ese DNI.', empleado });
    }

    await db.EmpleadosAdmision.create(empleado);
    res.redirect('/admin/empleados-admision');
  } catch (err) {
    console.error(err);
    return renderformEmpAdmision(req, res, { error: 'Error interno al crear el empleado.', empleado });
  }
}

async function AdminactualizarEmpAdmision(req, res) {
  const idEmpleado = req.params.id;
  const empleado = {
    dni: req.body.dni,
    nombre: req.body.nombre,
    apellido: req.body.apellido,
    correo: req.body.correo,
    fecha_nacimiento: req.body.fecha_nacimiento,
    telefono: req.body.telefono,
    estado: req.body.estado ? 1 : 0
  };

  if (!empleado.dni || !empleado.nombre || !empleado.apellido || !empleado.correo || !empleado.fecha_nacimiento) {
    return renderformEmpAdmision(req, res, { error: 'Complete los campos obligatorios.', empleado });
  }

  try {
    const empleadoExistente = await db.EmpleadosAdmision.findByPk(idEmpleado);
    if (!empleadoExistente) return res.redirect('/admin/empleados-admision');

    const duplicado = await db.EmpleadosAdmision.findOne({ where: { dni: empleado.dni } });
    if (duplicado && duplicado.idEmpleado != idEmpleado) {
      return renderformEmpAdmision(req, res, { error: 'Otro empleado ya tiene ese DNI.', empleado });
    }

    await db.EmpleadosAdmision.update(empleado, { where: { idEmpleado } });
    res.redirect('/admin/empleados-admision');
  } catch (err) {
    console.error(err);
    return renderformEmpAdmision(req, res, { error: 'Error interno al actualizar el empleado.', empleado });
  }
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

async function AdminAltaoBajaEspecialidad(req, res) {
  try {
    const idEspecialidad = req.params.id;
    const especialidad = await db.especialidades.findByPk(idEspecialidad);

    if (!especialidad) {
      return res.status(404).send('especialidad no encontrada');
    }

    especialidad.activo = especialidad.activo ? 0 : 1;
    await especialidad.save();

    res.redirect('/admin/especialidades');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al cambiar el estado de la especialidad');
  }
}

async function AdmincrearEspecialidad(req, res) {
  const especialidad = {
    nombre: req.body.nombre
  };

  if (!especialidad.nombre) {
    return renderformEspecialidad(req, res, { error: 'El nombre es obligatorio.', especialidad });
  }

  try {
    const existente = await db.especialidades.findOne({ where: { nombre: especialidad.nombre } });
    if (existente) {
      return renderformEspecialidad(req, res, { error: 'Ya existe una especialidad con ese nombre.', especialidad });
    }

    await db.Especialidades.create(especialidad);
    res.redirect('/admin/especialidades');
  } catch (err) {
    console.error(err);
    return renderformEspecialidad(req, res, { error: 'Error interno al crear la especialidad.', especialidad });
  }
}

async function AdminactualizarEspecialidad(req, res) {
  const idEspecialidad = req.params.id;
  const especialidad = {
    nombre: req.body.nombre
  };

  if (!especialidad.nombre) {
    return renderformEspecialidad(req, res, { error: 'El nombre es obligatorio.', especialidad });
  }

  try {
    const existente = await db.especialidades.findByPk(idEspecialidad);
    if (!existente) return res.redirect('/admin/especialidades');

    // Verificar si otro registro ya tiene el mismo nombre
    const duplicado = await db.especialidades.findOne({ where: { nombre: especialidad.nombre } });
    if (duplicado && duplicado.idEspecialidad != idEspecialidad) {
      return renderformEspecialidad(req, res, { error: 'Otra especialidad ya tiene ese nombre.', especialidad });
    }

    await db.Especialidades.update(especialidad, { where: { idEspecialidad } });
    res.redirect('/admin/especialidades');
  } catch (err) {
    console.error(err);
    return renderformEspecialidad(req, res, { error: 'Error interno al actualizar la especialidad.', especialidad });
  }
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

async function AdminAltaoBajaEnfermero(req, res) {
  try {
    const idEnfermero = req.params.id;
    const enfermero = await db.enfermeros.findByPk(idEnfermero);

    if (!enfermero) {
      return res.status(404).send('Enfermero no encontrado');
    }

    enfermero.activo = enfermero.activo ? 0 : 1;
    await enfermero.save();

    res.redirect('/admin/enfermeros');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al cambiar el estado del enfermero');
  }
}

async function AdmincrearEnfermero(req, res) {
  const enfermero = {
    nombre: req.body.nombre,
    apellido: req.body.apellido,
    dni: req.body.dni,
    matricula: req.body.matricula,
    telefono: req.body.telefono,
    email: req.body.email,
    fecha_nacimiento: req.body.fecha_nacimiento
  };

  if (!enfermero.nombre || !enfermero.apellido || !enfermero.dni || !enfermero.matricula) {
    return renderformEnfermero(req, res, { error: 'Complete los campos obligatorios.', enfermero });
  }

  try {
    const existente = await db.enfermeros.findOne({
      where: {
        [db.Sequelize.Op.or]: [
          { dni: enfermero.dni },
          { matricula: enfermero.matricula }
        ]
      }
    });

    if (existente) {
      return renderformEnfermero(req, res, { error: 'Ya existe un enfermero con ese DNI o matrícula.', enfermero });
    }

    await db.enfermeros.create(enfermero);
    res.redirect('/admin/enfermeros');
  } catch (err) {
    console.error(err);
    return renderformEnfermero(req, res, { error: 'Error interno al crear el enfermero.', enfermero });
  }
}

async function AdminactualizarEnfermero(req, res) {
  const idEnfermero = req.params.id;
  const enfermero = {
    nombre: req.body.nombre,
    apellido: req.body.apellido,
    dni: req.body.dni,
    matricula: req.body.matricula,
    telefono: req.body.telefono,
    email: req.body.email,
    fecha_nacimiento: req.body.fecha_nacimiento
  };

  if (!enfermero.nombre || !enfermero.apellido || !enfermero.dni || !enfermero.matricula) {
    return renderformEnfermero(req, res, { error: 'Complete los campos obligatorios.', enfermero });
  }

  try {
    const enfermeroExistente = await db.enfermeros.findByPk(idEnfermero);
    if (!enfermeroExistente) return res.redirect('/admin/enfermeros');

    const duplicado = await db.enfermeros.findOne({
      where: {
        [db.Sequelize.Op.or]: [
          { dni: enfermero.dni },
          { matricula: enfermero.matricula }
        ],
        idEnfermero: { [db.Sequelize.Op.ne]: idEnfermero }
      }
    });

    if (duplicado) {
      return renderformEnfermero(req, res, { error: 'Otro enfermero ya tiene ese DNI o matrícula.', enfermero });
    }

    await db.enfermeros.update(enfermero, { where: { idEnfermero } });
    res.redirect('/admin/enfermeros');
  } catch (err) {
    console.error(err);
    return renderformEnfermero(req, res, { error: 'Error interno al actualizar el enfermero.', enfermero });
  }
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

  const habitaciones = await db.habitaciones.findAll({ where: { activo: 1 } });

  res.render('formAdminCama', { cama, habitaciones });
}

async function AdminAltaoBajaCama(req, res) {
  try {
    const idCama = req.params.id;
    const cama = await db.camas.findByPk(idCama);

    if (!cama) {
      return res.status(404).send('cama no encontrada');
    }

    cama.activo = cama.activo ? 0 : 1;
    await cama.save();

    res.redirect('/admin/camas');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al cambiar el estado de la cama');
  }
}

async function AdmincrearCama(req, res) {
  const cama = {
    habitacion_id: req.body.habitacion_id,
    estado: req.body.estado || 'libre'
  };

  if (!cama.habitacion_id) {
    return renderformCamas(req, res, { error: 'Seleccione una habitación.', cama });
  }

  try {
    const existente = await db.camas.findOne({
      where: {
        habitacion_id: cama.habitacion_id,
        estado: cama.estado
      }
    });

    if (existente) {
      return renderformCamas(req, res, { error: 'Ya existe una cama con ese estado en la habitación seleccionada.', cama });
    }

    await db.camas.create(cama);
    res.redirect('/admin/camas');
  } catch (err) {
    console.error(err);
    return renderformCamas(req, res, { error: 'Error interno al crear la cama.', cama });
  }
}

async function AdminactualizarCama(req, res) {
  const idCama = req.params.id;
  const cama = {
    habitacion_id: req.body.habitacion_id,
    estado: req.body.estado || 'libre'
  };

  if (!cama.habitacion_id) {
    return renderformCamas(req, res, { error: 'Seleccione una habitación.', cama });
  }

  try {
    const camaExistente = await db.camas.findByPk(idCama);
    if (!camaExistente) return res.redirect('/admin/camas');

    const duplicado = await db.camas.findOne({
      where: {
        habitacion_id: cama.habitacion_id,
        estado: cama.estado,
        idCama: { [db.Sequelize.Op.ne]: idCama }
      }
    });

    if (duplicado) {
      return renderformCamas(req, res, { error: 'Otra cama ya tiene ese estado en la habitación seleccionada.', cama });
    }

    await db.camas.update(cama, { where: { idCama } });
    res.redirect('/admin/camas');
  } catch (err) {
    console.error(err);
    return renderformCamas(req, res, { error: 'Error interno al actualizar la cama.', cama });
  }
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

  const unidades = await db.unidades.findAll({ where: { activo: 1 } });
  const alas = await db.alas.findAll();

  res.render('formAdminHabitacion', { habitacion, unidades, alas });
}

async function AdminAltaoBajaHabitacion(req, res) {
  try {
    const idHabitacion = req.params.id;
    const habitacion = await db.habitaciones.findByPk(idHabitacion);

    if (!habitacion) {
      return res.status(404).send('habitacion no encontrada');
    }

    habitacion.activo = habitacion.activo ? 0 : 1;
    await habitacion.save();

    res.redirect('/admin/habitaciones');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al cambiar el estado de la habitacion');
  }
}

async function AdmincrearHabitacion(req, res) {
  const habitacion = {
    ala_id: req.body.ala_id,
    unidad_id: req.body.unidad_id,
    numero: req.body.numero,
    capacidad: req.body.capacidad
  };

  if (!habitacion.ala_id || !habitacion.unidad_id || !habitacion.numero || !habitacion.capacidad) {
    return renderformHabitacion(req, res, { error: 'Complete todos los campos obligatorios.', habitacion });
  }

  try {
    const existente = await db.habitaciones.findOne({
      where: {
        unidad_id: habitacion.unidad_id,
        numero: habitacion.numero
      }
    });

    if (existente) {
      return renderformHabitacion(req, res, { error: 'Ya existe una habitación con ese número en la unidad seleccionada.', habitacion });
    }

    await db.habitaciones.create(habitacion);
    res.redirect('/admin/habitaciones');
  } catch (err) {
    console.error(err);
    return renderformHabitacion(req, res, { error: 'Error interno al crear la habitación.', habitacion });
  }
}

async function AdminactualizarHabitacion(req, res) {
  const idHabitacion = req.params.id;
  const habitacion = {
    ala_id: req.body.ala_id,
    unidad_id: req.body.unidad_id,
    numero: req.body.numero,
    capacidad: req.body.capacidad
  };

  if (!habitacion.ala_id || !habitacion.unidad_id || !habitacion.numero || !habitacion.capacidad) {
    return renderformHabitacion(req, res, { error: 'Complete todos los campos obligatorios.', habitacion });
  }

  try {
    const habitacionExistente = await db.habitaciones.findByPk(idHabitacion);
    if (!habitacionExistente) return res.redirect('/admin/habitaciones');

    const duplicado = await db.habitaciones.findOne({
      where: {
        unidad_id: habitacion.unidad_id,
        numero: habitacion.numero,
        idHabitacion: { [db.Sequelize.Op.ne]: idHabitacion }
      }
    });

    if (duplicado) {
      return renderformHabitacion(req, res, { error: 'Otra habitación ya tiene ese número en la unidad seleccionada.', habitacion });
    }

    await db.habitaciones.update(habitacion, { where: { idHabitacion } });
    res.redirect('/admin/habitaciones');
  } catch (err) {
    console.error(err);
    return renderformHabitacion(req, res, { error: 'Error interno al actualizar la habitación.', habitacion });
  }
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

async function AdminAltaoBajaUnidad(req, res) {
  try {
    const idUnidad = req.params.id;
    const unidad = await db.unidades.findByPk(idUnidad);

    if (!unidad) {
      return res.status(404).send('Unidad no encontrada');
    }

    unidad.activo = unidad.activo ? 0 : 1;
    await unidad.save();

    res.redirect('/admin/unidades');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al cambiar el estado de la unidad');
  }
}

async function AdmincrearUnidad(req, res) {
  const unidad = {
    nombre: req.body.nombre
  };

  if (!unidad.nombre) {
    return renderformUnidad(req, res, { error: 'El nombre es obligatorio.', unidad });
  }

  try {
    const existente = await db.unidades.findOne({ where: { nombre: unidad.nombre } });
    if (existente) {
      return renderformUnidad(req, res, { error: 'Ya existe una unidad con ese nombre.', unidad });
    }

    await db.unidades.create(unidad);
    res.redirect('/admin/unidades');
  } catch (err) {
    console.error(err);
    return renderformUnidad(req, res, { error: 'Error interno al crear la unidad.', unidad });
  }
}

async function AdminactualizarUnidad(req, res) {
  const idUnidad = req.params.id;
  const unidad = {
    nombre: req.body.nombre
  };

  if (!unidad.nombre) {
    return renderformUnidad(req, res, { error: 'El nombre es obligatorio.', unidad });
  }

  try {
    const existente = await db.unidades.findByPk(idUnidad);
    if (!existente) return res.redirect('/admin/unidades');

    const duplicado = await db.unidades.findOne({ where: { nombre: unidad.nombre } });
    if (duplicado && duplicado.idUnidad != idUnidad) {
      return renderformUnidad(req, res, { error: 'Otra unidad ya tiene ese nombre.', unidad });
    }

    await db.unidades.update(unidad, { where: { idUnidad } });
    res.redirect('/admin/unidades');
  } catch (err) {
    console.error(err);
    return renderformUnidad(req, res, { error: 'Error interno al actualizar la unidad.', unidad });
  }
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

  const pacientes = await db.pacientes.findAll({ where: { activo: 1}});
  const motivos = await obtenerMotivos();
  const origenes = await db.origenes.findAll();
  const habitaciones = await db.habitaciones.findAll({ where: { activo: 1 } });
  let camas = [];
  if (admision) {
    camas = await db.camas.findAll({
      where: { habitacion_id: admision.habitacion_id }
    });
  }

  res.render('formAdminAdmision', { admision, pacientes, motivos, origenes, habitaciones, camas });
}

async function AdmincrearAdmision(req, res) {
  const admision = {
    paciente_id: req.body.paciente_id,
    motivo_id: req.body.motivo_id,
    origen_id: req.body.origen_id,
    habitacion_id: req.body.habitacion_id,
    cama_id: null
  };

  if (!admision.paciente_id || !admision.motivo_id || !admision.origen_id || !admision.habitacion_id) {
    return renderformAdmision(req, res, { error: 'Complete los campos obligatorios.', admision });
  }

  try {
    await db.admisiones.create(admision);
    res.redirect('/admin/admisiones');
  } catch (err) {
    console.error(err);
    return renderformAdmision(req, res, { error: 'Error interno al crear la admisión.', admision });
  }
}

async function AdminactualizarAdmision(req, res) {
  const idAdmision = req.params.id;
  const admision = {
    paciente_id: req.body.paciente_id,
    motivo_id: req.body.motivo_id,
    origen_id: req.body.origen_id,
    habitacion_id: req.body.habitacion_id,
    cama_id: req.body.cama_id || null
  };

  if (!admision.paciente_id || !admision.motivo_id || !admision.origen_id || !admision.habitacion_id) {
    return renderformAdmision(req, res, { error: 'Complete los campos obligatorios.', admision });
  }

  try {
    const admisionExistente = await db.admisiones.findByPk(idAdmision);
    if (!admisionExistente) return res.redirect('/admin/admisiones');

    await db.admisiones.update(admision, { where: { idAdmision } });
    res.redirect('/admin/admisiones');
  } catch (err) {
    console.error(err);
    return renderformAdmision(req, res, { error: 'Error interno al actualizar la admisión.', admision });
  }
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

async function AdminAltaoBajaMutual(req, res) {
  try {
    const idMutual = req.params.id;
    const mutual = await db.mutuales.findByPk(idMutual);

    if (!mutual) {
      return res.status(404).send('Mutual no encontrada');
    }

    mutual.activo = mutual.activo ? 0 : 1;
    await mutual.save();

    res.redirect('/admin/mutuales');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al cambiar el estado de la mutual');
  }
}

async function AdmincrearMutual(req, res) {
  const mutual = {
    nombre: req.body.nombre
  };

  if (!mutual.nombre) {
    return renderformMutual(req, res, { error: 'El nombre es obligatorio.', mutual });
  }

  try {
    const existente = await db.mutuales.findOne({ where: { nombre: mutual.nombre } });
    if (existente) {
      return renderformMutual(req, res, { error: 'Ya existe una mutual con ese nombre.', mutual });
    }

    await db.mutuales.create(mutual);
    res.redirect('/admin/mutuales');
  } catch (err) {
    console.error(err);
    return renderformMutual(req, res, { error: 'Error interno al crear la mutual.', mutual });
  }
}

async function AdminactualizarMutual(req, res) {
  const idMutual = req.params.id;
  const mutual = {
    nombre: req.body.nombre
  };

  if (!mutual.nombre) {
    return renderformMutual(req, res, { error: 'El nombre es obligatorio.', mutual });
  }

  try {
    const existente = await db.mutuales.findByPk(idMutual);
    if (!existente) return res.redirect('/admin/mutuales');

    const duplicado = await db.mutuales.findOne({ where: { nombre: mutual.nombre } });
    if (duplicado && duplicado.idMutual != idMutual) {
      return renderformMutual(req, res, { error: 'Otra mutual ya tiene ese nombre.', mutual });
    }

    await db.Mutuales.update(mutual, { where: { idMutual } });
    res.redirect('/admin/mutuales');
  } catch (err) {
    console.error(err);
    return renderformMutual(req, res, { error: 'Error interno al actualizar la mutual.', mutual });
  }
}


module.exports = {
  renderListaUsuarios, renderFormUsuario, renderFormCambiarContraseña, postCambiarContraseña, crearUsuarioNuevo, actualizarUsuarioExistente, renderConfirmarEliminar, eliminarUsuarioLista, renderResumen, renderAdminPaciente, renderAdminMedico, renderAdminEmpleadoAdm, renderAdminEspecialidad, renderAdminEnfermeros, renderAdminCamas, renderAdminAdmisiones, renderAdminUnidades, renderAdminHabitaciones, renderAdminMutuales, renderformPaciente, renderformMedico, renderformEmpAdmision, renderformAdmision, renderformUnidad, renderformHabitacion, renderformCamas, renderformEnfermero, renderformEspecialidad, renderformMutual, AdminAltaoBajaCama, AdminAltaoBajaEmpAdmision, AdminAltaoBajaEnfermero, AdminAltaoBajaEspecialidad, AdminAltaoBajaHabitacion, AdminAltaoBajaMedico, AdminAltaoBajaMutual, AdminAltaoBajaPaciente, AdminAltaoBajaUnidad, AdminactualizarAdmision, AdminactualizarCama, AdminactualizarEmpAdmision, AdminactualizarEnfermero, AdminactualizarEspecialidad, AdminactualizarHabitacion, AdminactualizarMedico, AdminactualizarMutual, AdminactualizarPaciente, AdminactualizarUnidad, AdmincrearAdmision, AdmincrearCama, AdmincrearEmpAdmision, AdmincrearEnfermero, AdmincrearEspecialidad, AdmincrearHabitacion, AdmincrearMedico, AdmincrearMutual, AdmincrearPaciente, AdmincrearUnidad
};