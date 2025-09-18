const { where } = require('sequelize');
const db = require('../Modelo');
const { AsignarCama, liberarCama } = require('./camasController');
const { obtenerHabsPorUnidad, obtenerHabsPorID } = require('./habitacionesController');
const { mostrarInternaciones } = require('./InternacionesController');
const { obtenerMotivos, obtenerMotivoPorID, obtenerMotivoPorEspecialidad } = require('./motivosController');
const { obtenerOrigenPorNombre } = require('./origenController');
const { buscarPorDNI } = require('./PacientesController');
const { obtenerTurnoPorID } = require('./TurnosController');

async function renderFormularioEmergencia(req, res, datosAdicionales = {}) {
  try {
    const motivos = await obtenerMotivos();
    res.render('formEmergencia', {
      motivos,
      ...datosAdicionales
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al cargar el formulario');
  }
}

async function FiltrarAdmisionPorDNI(dni) {
  try {
    const paciente = await db.pacientes.findOne({ where: { dni } });
    if (!paciente) {
      return null; 
    }

    const admisiones = await db.admisiones.findAll({
      where: { 
        paciente_id: paciente.idPaciente,
        estado: 'Activa'
      }
    });

    return admisiones; 
  } catch (error) {
    console.error('Error en FiltrarAdmisionPorDNI:', error);
    throw error;
  }
}

async function admitirEmergencia(req, res) {
  
  const { dni, idMotivo, Nombreorigen, sexo } = req.body;

  const dniRegex = /^\d{7,8}$/;

  if (
    !dni ||
    !idMotivo ||
    !Nombreorigen ||
    !sexo
  ) {
    const motivos = await obtenerMotivos();
    return renderFormularioEmergencia(req, res, {
      motivos,
      error: 'Por favor, complete todos los campos obligatorios.'}
    )
  }
  if (!['M', 'F'].includes(sexo)) {
    const motivos = await obtenerMotivos();
    return renderFormularioEmergencia(req, res, {
      motivos,
      error: 'Sexo Inválido'}
    )
  }
  if (!dniRegex.test(dni)) {
    const motivos = await obtenerMotivos();
    return renderFormularioEmergencia(req, res, {
      error: 'El DNI debe tener 7 u 8 dígitos numéricos.',
      motivos
    });
  }

  let paciente = await buscarPorDNI(dni);
  if (!paciente) {
    paciente = await db.pacientes.create({ dni, sexo });
  } else if (!paciente.sexo) {
    await paciente.update({ sexo });
}

  const admisionActiva = await db.admisiones.findOne({
    where: {
      paciente_id: paciente.idPaciente,
      estado: 'Activa'
    }
  });

  if (admisionActiva) {
    const motivos = await obtenerMotivos();
    return renderFormularioEmergencia(req, res, {
      motivos,
      error: 'El paciente ya está internado actualmente.'
    });
  }

  const origen = await obtenerOrigenPorNombre(Nombreorigen);

  const motivo = await obtenerMotivoPorID(idMotivo);

  const habitaciones = await obtenerHabsPorUnidad(motivo.idEspecialidad);

  try {
    const cama = await AsignarCama(paciente.idPaciente, habitaciones);

    const admision = {
      paciente_id: paciente.idPaciente,
      motivo_id: motivo.idMotivo,
      origen_id: origen.idOrigen,
      habitacion_id: cama.habitacion_id,
      cama_id: cama.idCama,
      estado: 'Activa'
    }

    await db.admisiones.create(admision);

    const habitacion = await obtenerHabsPorID(cama.habitacion_id)

    return res.render('AdmisionInfo', {
      dni: paciente.dni,
      unidad: habitacion.unidad_id,
      ala: habitacion.ala_id,
      habitacion: habitacion.numero, 
      cama: cama.idCama 
    });

  } catch (error) {
      console.error('Error al asignar cama:', error);
      const motivos = await obtenerMotivos();
      return renderFormularioEmergencia(req, res, {
        error: 'No hay camas disponibles para este paciente.',
        motivos
      });
  }
}

async function renderFormularioAdmision(req, res, datosAdicionales = {}) {
  try {
    const dni = req.params.dni;
    const idTurno = req.params.id;
    const turno = await obtenerTurnoPorID(idTurno);
    const motivos = await obtenerMotivoPorEspecialidad(turno.idEspecialidad);
    res.render('formAdmisionTurno', {
      motivos,
      dni,
      idTurno,
      ...datosAdicionales
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al cargar el formulario');
  }
}

async function admitirTurno(req, res) {
    
    const { idMotivo, Nombreorigen, dni, idTurno } = req.body;

    if (
    !dni ||
    !idMotivo ||
    !Nombreorigen ||
    !idTurno
  ) {
    const turno = await obtenerTurnoPorID(idTurno);
    const motivos = await obtenerMotivoPorEspecialidad(turno.idEspecialidad);
    return res.render('formAdmisionTurno', {
      motivos,
      dni,
      idTurno,
      error: 'Por favor, complete todos los campos obligatorios.'}
    )
  }

  let paciente = await buscarPorDNI(dni);

  const admisionActiva = await db.admisiones.findOne({
    where: {
      paciente_id: paciente.idPaciente,
      estado: 'Activa'
    }
  });

  if (admisionActiva) {
    const turno = await obtenerTurnoPorID(idTurno);
    const motivos = await obtenerMotivoPorEspecialidad(turno.idEspecialidad);
    return res.render('formAdmisionTurno', {
      motivos,
      dni,
      idTurno,
      error: 'El paciente ya tiene una internacion Activa.'}
    );
  }

  const origen = await obtenerOrigenPorNombre(Nombreorigen);

  const motivo = await obtenerMotivoPorID(idMotivo);

  const habitaciones = await obtenerHabsPorUnidad(motivo.idEspecialidad);

  try {
    const cama = await AsignarCama(paciente.idPaciente, habitaciones);

    const admision = {
      paciente_id: paciente.idPaciente,
      motivo_id: motivo.idMotivo,
      origen_id: origen.idOrigen,
      habitacion_id: cama.habitacion_id,
      cama_id: cama.idCama,
      estado: 'Activa'
    }

    await db.admisiones.create(admision);

    const habitacion = await obtenerHabsPorID(cama.habitacion_id);

    const turno = await obtenerTurnoPorID(idTurno);
    await turno.update({ estado: 'Atendido' });

    return res.render('AdmisionInfo', {
      dni: paciente.dni,
      unidad: habitacion.unidad_id,
      ala: habitacion.ala_id,
      habitacion: habitacion.numero, 
      cama: cama.idCama 
    });

  } catch (error) {
      console.error('Error al asignar cama:', error);
      const turno = obtenerTurnoPorID(idTurno);
        const motivos = await obtenerMotivoPorEspecialidad(turno.idEspecialidad);
        return res.render('formAdmisionTurno', {
            motivos,
            dni,
            idTurno,
            error: 'No hay camas disponibles para este paciente.'
        });
  }

}

async function renderFormularioDerivacion(req, res, datosAdicionales = {}) {
    try {
        const dni = req.params.dni;
        const motivos = await obtenerMotivos();
        res.render('formAdmisionDerivacion', {
            motivos,
            dni,
            ...datosAdicionales
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al cargar el formulario');
    }
}

async function admitirDerivacion(req, res) {
    const { idMotivo, Nombreorigen, dni} = req.body;

    if (
    !dni ||
    !idMotivo ||
    !Nombreorigen
  ) {
    const motivos = await obtenerMotivos();
        return res.render('formAdmisionDerivacion', {
            motivos,
            dni,
            error: 'Por favor, complete todos los campos obligatorios.'}
    )
  }

  const paciente = await buscarPorDNI(dni);

  const admisionActiva = await db.admisiones.findOne({
    where: {
      paciente_id: paciente.idPaciente,
      estado: 'Activa'
    }
  });

  if (admisionActiva) {
    const motivos = await obtenerMotivos();
    return renderFormularioDerivacion(req, res, {
      motivos,
      dni,
      error: 'El paciente ya está internado actualmente.'
    });
  }

  const origen = await obtenerOrigenPorNombre(Nombreorigen);

  const motivo = await obtenerMotivoPorID(idMotivo);

  const habitaciones = await obtenerHabsPorUnidad(motivo.idEspecialidad);

  try {
    const cama = await AsignarCama(paciente.idPaciente, habitaciones);

    const admision = {
      paciente_id: paciente.idPaciente,
      motivo_id: motivo.idMotivo,
      origen_id: origen.idOrigen,
      habitacion_id: cama.habitacion_id,
      cama_id: cama.idCama,
      estado: 'Activa'
    }

    await db.admisiones.create(admision);

    const habitacion = await obtenerHabsPorID(cama.habitacion_id)

    return res.render('AdmisionInfo', {
      dni: paciente.dni,
      unidad: habitacion.unidad_id,
      ala: habitacion.ala_id,
      habitacion: habitacion.numero, 
      cama: cama.idCama 
    });

  } catch (error) {
      console.error('Error al asignar cama:', error);
      const motivos = await obtenerMotivos();
      return renderFormularioDerivacion(req, res, {
        error: 'No hay camas disponibles para este paciente.',
        dni,
        motivos
      });
  }

}

async function renderConfirmarCancelarAdmision(req, res) {
  const dni = req.params.dni;
  try {
    const admisiones = await db.admisiones.findAll({
      where: { estado: 'Activa' },
      include: [
        {
          model: db.pacientes,
          as: 'paciente',
          where: { dni }
        }
      ]
    });

    if (!admisiones || admisiones.length === 0) {
      return res.redirect('/PacientesInternados');
    }

    const admision = admisiones[0];
    res.render('ConfirmarCancelarAdmision', { admision });
  } catch (err) {
    console.error(err);
    res.status(500).send('Ocurrió un error al cargar la página de confirmación');
  }
}

async function cancelarAdmision(req, res) {
  try {
    const dni = req.params.dni;

    const admisiones = await FiltrarAdmisionPorDNI(dni);

    if (!admisiones || admisiones.length === 0) {
      console.log(`No se encontró admisión activa para el DNI ${dni}`);
      return res.status(404).send("No se encontró una admisión activa");
    }

    const admision = admisiones[0];

    await db.admisiones.destroy({
      where: { idAdmision: admision.idAdmision }
    });

    await liberarCama(admision.cama_id);

    console.log(`Admisión ${admision.idAdmision} eliminada`);

    return mostrarInternaciones(req, res);

  } catch (error) {
    console.error("Error al cancelar la admisión:", error);
    return res.status(500).send("Error al cancelar la admisión");
  }
}


async function darDeAlta(req, res) {
  try {
    const dni = req.params.dni;

    const admisiones = await FiltrarAdmisionPorDNI(dni);

    if (!admisiones || admisiones.length === 0) {
      console.log(`No se encontró admisión activa para el DNI ${dni}`);
      return res.status(404).send("No se encontró una admisión activa para este paciente");
    }

    const admision = admisiones[0];

    await admision.update({ 
      estado: 'Alta',
      fecha_alta: new Date()
    });

    if (admision.cama_id) {
      await liberarCama(admision.cama_id);
    }

    console.log(`Paciente con DNI ${dni} dado de alta. Admision ${admision.idAdmision} marcada como 'Alta' en fecha ${admision.fecha_alta}.`);

    return;

  } catch (error) {
    console.error("Error al dar de alta al paciente:", error);
    return res.status(500).send("Error al dar de alta al paciente");
  }
}

async function obtenerAdmisiones() {
  return await db.admisiones.findAll();
}




module.exports = {admitirEmergencia, renderFormularioEmergencia, renderFormularioAdmision, admitirTurno, renderFormularioDerivacion, admitirDerivacion, FiltrarAdmisionPorDNI, cancelarAdmision, darDeAlta, obtenerAdmisiones, renderConfirmarCancelarAdmision}