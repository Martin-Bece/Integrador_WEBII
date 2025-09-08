const { where } = require('sequelize');
const db = require('../Modelo');
const { obtenerEstudios } = require('./estudiosController');
const { obtenerDiagnosticoPorID } = require('./diagnosticoController');

async function obtenerMedicos() {
  return await db.medicos.findAll();
}

async function obtenerMedicoPorID(idMedico) {
  return await db.medicos.findOne({ where: { idMedico } });
}

async function obtenerMedicosPorEspecialidad(idEspecialidad) {
  return await db.medicos.findAll({ where: { idEspecialidad } });
}

async function obtenerMedicoPorDNI(dni) {
  return await db.medicos.findOne({ where: { dni }});
}

async function renderPaginaInicio(req, res, datosAdicionales = {}) {
  const medico = await db.medicos.findOne({ where: { dni: req.session.usuario.dni } });
  if (!medico) return res.redirect('/login');

  const idMedico = medico.idMedico;
  const idEspecialidad = medico.idEspecialidad;

  const pacientesEmergenciaDerivacion = await db.admisiones.findAll({
    where: { estado: 'Activa', origen_id: [1, 2] },
    include: [
      { model: db.pacientes, as: 'paciente' },
      { 
        model: db.motivos, 
        as: 'motivo',
        where: { idEspecialidad },
        include: [
          { model: db.sintomas, as: 'sintomas' }
        ]
      }
    ]
  });

  const turnosConAdmision = await db.turnos.findAll({
    where: { idMedico },
    include: [
      {
        model: db.pacientes,
        as: 'paciente',
        include: [
          {
            model: db.admisiones,
            as: 'admisiones',
            where: { estado: 'Activa' },
            required: false,
            include: [
              { model: db.motivos, as: 'motivo', include: [{ model: db.sintomas, as: 'sintomas' }] }
            ]
          }
        ]
      }
    ]
  });

  const pacientesConTurno = turnosConAdmision
    .map(t => t.paciente && t.paciente.admisiones
      ? t.paciente.admisiones
          .map(a => ({ ...a, paciente: t.paciente })) 
      : [])
    .flat();

  const pacientes = [...pacientesEmergenciaDerivacion, ...pacientesConTurno];

  res.render('PaginaInicioMedicos', { pacientes });
}

async function atenderPaciente(req, res) {
  try {
    const dniMedico = req.session?.usuario?.dni;
    const dniPaciente = req.params.dni;

    if (!dniMedico) {
      return res.status(400).send("No se encontró el DNI del médico en la sesión");
    }

    const medico = await obtenerMedicoPorDNI(dniMedico);
    if (!medico) {
      return res.status(404).send("Médico no encontrado");
    }

    const { buscarPorDNI } = require('./PacientesController');
    const paciente = await buscarPorDNI(dniPaciente);

    if (medico.idEspecialidad == 21 || medico.idEspecialidad == 22) {
      return res.render("MedicosEspecialistas", { dniPaciente, paciente });
    } else {
      return res.render("MedicosClinicos", { dniPaciente, paciente });
    }
  } catch (error) {
    console.error("Error en atenderPaciente:", error);
    return res.status(500).send("Error interno del servidor");
  }
}

async function renderPlanCMedicos(req, res, datosAdicionales = {}) {
  const { buscarPorDNI } = require('./PacientesController');
  const { buscarPlanPorID } = require('./plancController');
  const { buscarEnfermeroPorID } = require('./enfermeriaController');

  const dni = req.params.dni;

  try {
    const paciente = await buscarPorDNI(dni);

    if (!paciente) {
      return res.status(404).send("Paciente no encontrado");
    }

    const plan = await buscarPlanPorID(paciente.idPaciente);

    if (!plan) {
      return res.status(404).send("El paciente no tiene plan de cuidados. Tiene que ser atendido por un enfermero previamente");
    }

    const enfermero = await buscarEnfermeroPorID(plan.id_enfermero);

    res.render('FormPlanC', {
      dni,
      paciente,
      enfermero,
      planCuidados: plan,
      ...datosAdicionales
    });
  } catch (error) {
    console.error("Error en renderPlanCMedicos:", error);
    res.status(500).send("Error interno del servidor");
  }
}

async function renderFormDiagnostico(req, res, datosAdicionales = {}) {
  
  const dni = req.params.dni

  const { buscarPorDNI } = require('./PacientesController');

  const paciente = await buscarPorDNI(dni);

  const estudios = await obtenerEstudios();

  const diagnostico = await obtenerDiagnosticoPorID(paciente.idPaciente);

  res.render('formDiagnostico', {paciente, estudios, diagnostico: diagnostico?.diagnostico || '', ...datosAdicionales})

}

async function guardarDiagnostico(req, res) {
  const diagnosticoC = {
    idPaciente: req.body.idPaciente,
    diagnostico: req.body.diagnostico
  };

  if (!diagnosticoC.idPaciente || !diagnosticoC.diagnostico) {
    return renderFormDiagnostico(req, res, { errores: ["Debe completar todos los campos"] });
  }

  try {
    const diagnosticoExistente = await db.diagnostico.findOne({
      where: { idPaciente: diagnosticoC.idPaciente }
    });

    if (diagnosticoExistente) {
      await diagnosticoExistente.update({ diagnostico: diagnosticoC.diagnostico });
    } else {
      await db.diagnostico.create(diagnosticoC);
    }

    const estudiosSeleccionados = req.body.estudios || [];
    const fechaHoy = new Date().toISOString().split('T')[0]; 

    for (const idEstudio of estudiosSeleccionados) {
      await db.pacientes_estudios.create({
        idPaciente: diagnosticoC.idPaciente,
        idEstudio: idEstudio,
        fecha: fechaHoy,
        descripcion: "Pendiente"
      });
    }

    const dni = req.params.dni;
    res.redirect(`/medicos/atender/${dni}`);

  } catch (error) {
    console.error(error);
    return renderFormDiagnostico(req, res, { errores: ["Ocurrió un error al guardar el diagnóstico"] });
  }
}

async function renderHistoria(req, res, datosAdicionales = {}) {
  const { dni } = req.params;
  const { buscarPorDNI } = require('./PacientesController');

  const paciente = await buscarPorDNI(dni);
  if (!paciente) return res.status(404).send('Paciente no encontrado');

  const historia = await db.historia_clinica_interna.findAll({
    where: { idPaciente: paciente.idPaciente },
    order: [['fecha', 'DESC']]
  });

  res.render('formHistoriaC', { paciente, historia, ...datosAdicionales });
}

async function guardarHistoria(req, res) {
  const { observacion } = req.body;
  const { dni } = req.params;

  const { buscarPorDNI } = require('./PacientesController');

  const paciente = await buscarPorDNI(dni);
  if (!paciente) return res.status(404).send('Paciente no encontrado');

  if (!observacion) {
    return renderHistoria(req, res, { errores: ['Debe ingresar una observación'] });
  }

  try {
    await db.historia_clinica_interna.create({
      idPaciente: paciente.idPaciente,
      observacion
    });

    res.redirect(`/medicos/historia-clinica/${dni}`);
  } catch (error) {
    console.error(error);
    res.render('formHistoriaC', { paciente, historia: [], errores: ['Error al guardar la observación'] });
  }
}



module.exports = { obtenerMedicos, obtenerMedicosPorEspecialidad, obtenerMedicoPorID, renderPaginaInicio, atenderPaciente, renderPlanCMedicos, renderFormDiagnostico, guardarDiagnostico, renderHistoria, guardarHistoria };
