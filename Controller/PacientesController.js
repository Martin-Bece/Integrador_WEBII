
const db = require('../Modelo');
const { obtenerEspecialidades, obtenerEspecialidadPorID } = require('./especialidadesController');
const { obtenerMedicosPorEspecialidad, obtenerMedicoPorID } = require('./medicosController');
const { obtenerMutuales } = require('./mutualesController');
const { obtenerTurnosPorDNI } = require('./TurnosController');
const { obtenerMotivos, obtenerMotivoPorID } = require('./motivosController'); 
const { obtenerOrigenPorNombre } = require('./origenController');
const { obtenerHabsPorUnidad, obtenerHabsPorID } = require('./habitacionesController');
const { AsignarCama } = require('./camasController');

async function buscarPorDNI(dni) {
    const paciente = await db.pacientes.findOne({ where: { dni } });
    return paciente;
}

async function buscarPacientePOST(req, res) {
  const dni = req.body.dni;

  try {
    const paciente = await buscarPorDNI(dni);

    if (paciente) {
      return res.redirect(`/portalPaciente/${paciente.dni}`);

    } else {
      return res.redirect(`/FormularioPaciente?dni=${dni}`);
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Error interno del servidor');
  }
}

async function mostrarPortalPaciente(req, res) {
  const { dni } = req.params;

  try {
    const paciente = await buscarPorDNI(dni);

    if (paciente) {
      const turnos = await obtenerTurnosPorDNI(dni);

      return res.render('portalPaciente', { paciente, turnos });
    } else {
      return res.redirect(`/FormularioPaciente?dni=${dni}`);
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Error interno del servidor');
  }
}


async function renderFormularioPaciente(req, res, datosAdicionales = {}) {
  try {
    const mutuales = await obtenerMutuales();
    const dni = req.query.dni || ''
    const paciente = await buscarPorDNI(dni);

    res.render('FormularioPaciente', {
      mutuales,
      dni,
      paciente,
      ...datosAdicionales
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al cargar el formulario');
  }
}

async function crearPaciente(req, res) {
  const paciente = req.body;

  if (
    !paciente.nombre ||
    !paciente.apellido ||
    !paciente.dni ||
    !paciente.fecha_nacimiento ||
    !paciente.sexo ||
    !paciente.telefono ||
    !paciente.direccion ||
    !paciente.mutual_id
  ) {
    return renderFormularioPaciente(req, res, {
      error: 'Por favor, complete todos los campos obligatorios.',
      paciente
    });
  }

  const dniRegex = /^\d{7,8}$/;
  const telefonoRegex = /^\d{8,15}$/;

  if (!dniRegex.test(paciente.dni)) {
    return renderFormularioPaciente(req, res, {
      error: 'El DNI debe tener 7 u 8 dígitos numéricos.',
      paciente
    });
  }

  if (!telefonoRegex.test(paciente.telefono)) {
    return renderFormularioPaciente(req, res, {
      error: 'El teléfono debe contener solo números y tener entre 8 y 15 dígitos.',
      paciente
    });
  }

  try {
    const pacienteExistente = await buscarPorDNI(paciente.dni);

    if (pacienteExistente) {
      return await actualizarPaciente(req, res)
    }

    await db.pacientes.create(paciente);

    res.redirect(`/portalPaciente/${paciente.dni}`);
  } catch (error) {
    console.error(error);
    return renderFormularioPaciente(req, res, {
      error: 'Error interno al crear el paciente.',
      paciente
    });
  }
}

async function actualizarPaciente(req, res) {
  try {
    const datosActualizados = {
      nombre: req.body.nombre,
      apellido: req.body.apellido,
      telefono: req.body.telefono,
      direccion: req.body.direccion,
      fecha_nacimiento: req.body.fecha_nacimiento,
      sexo: req.body.sexo,
      mutual_id: req.body.mutual_id
    };

    await db.pacientes.update(datosActualizados, {
      where: { dni: req.body.dni }
    });

    return res.redirect(`/portalPaciente/${req.body.dni}`);
  } catch (error) {
    console.error('Error al actualizar:', error);
    return res.status(500).send('Error al actualizar paciente.');
  }
}

async function darDeBaja(req, res) {
  const { dni } = req.params;
  try {
    await db.pacientes.update({ activo: false }, { where: { dni } });
    res.redirect(`/portalPaciente/${dni}`);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al dar de baja el paciente');
  }
}

async function darDeAlta(req, res) {
  const { dni } = req.params;
  try {
    await db.pacientes.update({ activo: true }, { where: { dni } });
    res.redirect(`/portalPaciente/${dni}`);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al dar de alta el paciente');
  }
}

async function renderNuevoTurno(req, res, errores, datosParciales = {}) {
  try {
    const { dni } = req.params;
    const especialidades = await obtenerEspecialidades();

    res.render('NuevoTurno', {
      errores,
      especialidades,
      dni,
      ...datosParciales
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al mostrar el formulario de turnos');
  }
}

async function EspecialidadTurno(req, res) {
  try {
    const { fecha, hora, idEspecialidad } = req.body;
    const { dni } = req.params;
    const errores = [];

    if (!fecha || !hora || !idEspecialidad) {
      errores.push('Todos los campos son obligatorios.');
    }

    const fechaSeleccionada = new Date(`${fecha}T${hora}`);
    const ahora = new Date();
    if (isNaN(fechaSeleccionada.getTime()) || fechaSeleccionada < ahora) {
      errores.push('La fecha y hora del turno deben ser válidas y futuras.');
    }

    if (!/^\d+$/.test(idEspecialidad)) {
      errores.push('La especialidad seleccionada no es válida.');
    }

    if (errores.length > 0) {
      return await renderNuevoTurno(req, res, errores, { fecha, hora, idEspecialidad });
    }

    const medicos = await obtenerMedicosPorEspecialidad(idEspecialidad);

    if (!medicos || medicos.length === 0) {
      return await renderNuevoTurno(req, res, ['No hay médicos disponibles para la especialidad seleccionada.'], { fecha, hora, idEspecialidad });
    }

    res.render('NuevoTurnoMedico', {
      fecha,
      hora,
      idEspecialidad,
      medicos,
      dni
    });

  } catch (error) {
    console.error(error);
    res.status(500).send('Error al procesar la especialidad');
  }
}

async function confirmarTurno(req, res) {
  try {
    const { fecha, hora, idEspecialidad, idMedico, dni } = req.body;

    const errores = [];

    if (!fecha || !hora || !idEspecialidad || !idMedico || !dni) {
      errores.push('Todos los campos son obligatorios.');
    }

    const fechaSeleccionada = new Date(`${fecha}T${hora}`);
    const ahora = new Date();
    if (isNaN(fechaSeleccionada.getTime()) || fechaSeleccionada < ahora) {
      errores.push('La fecha y hora del turno deben ser válidas y futuras.');
    }

    const paciente = await buscarPorDNI(dni);
    const medico = await obtenerMedicoPorID(idMedico);
    const especialidad = await obtenerEspecialidadPorID(idEspecialidad);

    if (!paciente) errores.push('Paciente no encontrado.');
    if (!medico) errores.push('Médico no válido.');
    if (!especialidad) errores.push('Especialidad no válida.');

    if (errores.length > 0) {
      const medicos = await obtenerMedicosPorEspecialidad(idEspecialidad);
      return res.render('NuevoTurnoMedico', {
        errores,
        fecha,
        hora,
        especialidad: idEspecialidad,
        medicos,
        dni
      });
    }

    const turno = {
      fecha,
      hora,
      paciente_id: paciente.idPaciente,
      idMedico: medico.idMedico,
      idEspecialidad: especialidad.idEspecialidad
    };

    await db.turnos.create(turno);

    return res.redirect(`/portalPaciente/${req.body.dni}`);

  } catch (error) {
    console.error(error);
    res.status(500).send('Error al confirmar el turno');
  }
}

async function cancelarTurno(req, res) {
  try {
    const turnoId = req.params.id;
    const dni = req.params.dni;

    await db.turnos.destroy({ where: { idTurno: turnoId } });

    res.redirect(`/portalPaciente/${dni}`);
  } catch (error) {
    console.error('Error al cancelar turno:', error);
    res.status(500).send('Error al cancelar el turno');
  }
}


module.exports = {
  mostrarPortalPaciente,
  buscarPacientePOST,
  renderFormularioPaciente,
  crearPaciente,
  darDeAlta,
  darDeBaja,
  renderNuevoTurno,
  EspecialidadTurno,
  confirmarTurno,
  cancelarTurno,
  buscarPorDNI
};
