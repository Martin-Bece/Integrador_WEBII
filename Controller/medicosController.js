const { where } = require('sequelize');
const db = require('../Modelo');
const { obtenerEstudios } = require('./estudiosController');
const { obtenerDiagnosticoPorID } = require('./diagnosticoController');
const { darDeAlta, FiltrarAdmisionPorDNI } = require('./admisionesController');

async function obtenerMedicos() {
  return await db.medicos.findAll();
}

async function obtenerMedicoPorID(idMedico) {
  return await db.medicos.findOne({ where: { idMedico } });
}

async function obtenerMedicosPorEspecialidad(idEspecialidad) {
  return await db.medicos.findAll({ where: { idEspecialidad, activo: 1 } });
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
      ? t.paciente.admisiones.map(a => ({ ...a, paciente: t.paciente })) 
      : [])
    .flat();

  const pacientes = [...pacientesEmergenciaDerivacion, ...pacientesConTurno];

  res.render('PaginaInicioMedicos', { pacientes });
}

async function atenderPaciente(req, res) {
  try {
    const dniMedico = req.session?.usuario?.dni;
    const dniPaciente = req.params.dni;

    if (!dniMedico) return res.status(400).send("No se encontró el DNI del médico en la sesión");

    const medico = await obtenerMedicoPorDNI(dniMedico);
    if (!medico) return res.status(404).send("Médico no encontrado");

    // Circular dependency resuelta: require dentro de la función
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
  try {
    const { buscarPorDNI } = require('./PacientesController');
    const { buscarPlanPorID } = require('./plancController');
    const { buscarEnfermeroPorID } = require('./enfermeriaController');

    const dni = req.params.dni;
    const paciente = await buscarPorDNI(dni);

    if (!paciente) return res.status(404).send("Paciente no encontrado");

    const plan = await buscarPlanPorID(paciente.idPaciente);
    if (!plan) return res.status(404).send("El paciente no tiene plan de cuidados. Tiene que ser atendido por un enfermero previamente");

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
  const dni = req.params.dni;
  const { buscarPorDNI } = require('./PacientesController');

  const paciente = await buscarPorDNI(dni);
  const estudios = await obtenerEstudios();
  const diagnostico = await obtenerDiagnosticoPorID(paciente.idPaciente);

  res.render('formDiagnostico', {
    paciente,
    estudios,
    diagnostico: diagnostico?.diagnostico || '',
    ...datosAdicionales
  });
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

async function renderFormAlta(req, res, datosAdicionales = {}) {
  try {
    const dni = req.params.dni;
    const { buscarPorDNI } = require('./PacientesController');

    const paciente = await buscarPorDNI(dni);
    if (!paciente) return res.status(404).send("Paciente no encontrado");

    res.render('formAlta', { paciente, ...datosAdicionales });
  } catch (error) {
    console.error("Error al cargar el formulario de alta:", error);
    return res.status(500).send("Error interno al cargar el formulario");
  }
}

async function darAltaMedica(req, res) {
  try {
    const dni = req.params.dni;
    const informe = req.body;

    const admisiones = await FiltrarAdmisionPorDNI(dni);
    if (!admisiones || admisiones.length === 0) {
      return res.status(404).send("No se encontró una admisión activa para este paciente");
    }

    const admision = admisiones[0];
    informe.admision_id = admision.idAdmision;

    await darDeAlta(req, res); 

    await db.informes_alta.create({
      admision_id: informe.admision_id,
      diagnostico_final: informe.diagnostico_final,
      medicacion: informe.medicacion,
      recomendaciones: informe.recomendaciones,
      observaciones: informe.observaciones || null,
      fecha_alta: new Date()
    });

    res.render('ExitoAlta', { paciente: { dni } });

  } catch (error) {
    console.error("Error al dar alta médica:", error);
    res.status(500).send("Ocurrió un error al dar de alta al paciente");
  }
}

async function renderVerInformes(req, res) {
  try {
    const dni = req.params.dni;

    const medico = await db.medicos.findOne({ where: { dni: req.session.usuario.dni } });
    if (!medico) return res.redirect('/login');

    const paciente = await db.pacientes.findOne({ where: { dni } });
    if (!paciente) return res.status(404).send("Paciente no encontrado");

    const idPaciente = paciente.idPaciente;
    const idEspecialidad = medico.idEspecialidad;

    const informesEstudios = await db.informes.findAll({
      where: { idPaciente, idEspecialidad },
      include: [
        { model: db.estudios, as: "idEstudio_estudio" }
      ],
      order: [['fechaInforme', 'DESC']]
    });

    const informesEnfermeria = await db.informe_enfermero.findAll({
      where: { id_paciente: idPaciente, id_especialidad: idEspecialidad },
      include: [
        { model: db.enfermeros, as: "id_enfermero_enfermero" }
      ],
      order: [['fecha_hora', 'DESC']]
    });

    res.render('verInformes', {
      paciente,
      informesEstudios,
      informesEnfermeria
    });

  } catch (error) {
    console.error("Error en renderVerInformes:", error);
    res.status(500).send("Error al cargar los informes");
  }
}

async function renderInformeEstudio(req, res) {
  try {
    const { dni } = req.params;
    const idInforme = req.params.id;

    const paciente = await db.pacientes.findOne({ where: { dni } });
    if (!paciente) return res.redirect('/medicos');

    const informeEstudio = await db.informes.findOne({
      where: { idPaciente: paciente.idPaciente, idInforme },
      include: [
        { model: db.estudios, as: 'idEstudio_estudio' },
      ],
      order: [['fechaInforme', 'DESC']]
    });

    res.render('informeEstudio', { paciente, informeEstudio });
  } catch (error) {
    console.error(error);
    res.redirect('/medicos');
  }
}

async function renderInformeEnfermeria(req, res) {
  try {
    const { dni } = req.params;
    const idInforme = req.params.id;

    const paciente = await db.pacientes.findOne({ where: { dni } });
    if (!paciente) return res.redirect('/medicos');

    const informesEnfermeria = await db.informe_enfermero.findAll({
      where: { id_paciente: paciente.idPaciente, id_informe: idInforme },
      include: [
        { model: db.enfermeros, as: 'id_enfermero_enfermero' }
      ],
      order: [['fecha_hora', 'DESC']]
    });

    res.render('informeEnfermeria', { paciente, informesEnfermeria });
  } catch (error) {
    console.error(error);
    res.redirect('/medicos');
  }
}

async function renderMedicosEspecialistas(req, res) {
  try {
    const medicoDNI = req.session.usuario.dni; 
    const medico = await obtenerMedicoPorDNI(medicoDNI);

    if (!medico) return res.status(404).send("Médico no encontrado");

    const pacientesEstudios = await db.pacientes_estudios.findAll({
      where: { descripcion: "Pendiente" },
      include: [
        {
          model: db.pacientes,
          as: 'idPaciente_paciente',
          attributes: ['idPaciente', 'dni', 'nombre', 'apellido']
        },
        {
          model: db.estudios,
          as: 'idEstudio_estudio',
          attributes: ['idEstudio', 'nombre', 'idEspecialidad'],
          where: { idEspecialidad: medico.idEspecialidad }
        }
      ],
      order: [['fecha', 'DESC']]
    });

    res.render('InicioMedicosEspecialistas', { pacientesEstudios });
  } catch (error) {
    console.error('Error al obtener estudios asignados:', error);
    res.status(500).send('Error interno del servidor');
  }
}

async function renderInformeEspecialista(req, res) {
  try {
    const { idPaciente, idEstudio, fecha } = req.params;

    const paciente = await db.pacientes.findByPk(idPaciente);
    const estudio = await db.estudios.findByPk(idEstudio);

    if (!paciente || !estudio) {
      return res.status(404).send("Paciente o estudio no encontrado");
    }

    await db.pacientes_estudios.update({ descripcion: "Realizado" }, { where: { idPaciente, idEstudio, fecha } });

    return res.render('MedicosEspecialistas', { paciente, estudio });
  } catch (error) {
    console.error("Error al actualizar estudio:", error);
    return res.status(500).send("Error interno del servidor");
  }
}

async function enviarInformeEspecialista(req, res) {
  try {
    const admisionPaciente = await db.admisiones.findOne({ 
      where: { paciente_id: req.body.idPaciente, estado: 'Activa' } 
    });

    if (!admisionPaciente) {
      return res.status(404).send("No se encontró admisión activa para el paciente");
    }

    const motivo = await db.motivos.findByPk(admisionPaciente.motivo_id);
    const medico = await obtenerMedicoPorDNI(req.session.usuario.dni);

    if (!motivo || !medico) {
      return res.status(404).send("Motivo o médico no encontrado");
    }

    const informe = {
      idPaciente: req.body.idPaciente,
      idEstudio: req.body.idEstudio,
      resultado: req.body.resultado,
      idEspecialidad: motivo.idEspecialidad,
      idMedico: medico.idMedico
    };

    await db.informes.create(informe);

    res.redirect('/MedicosE');
  } catch (error) {
    console.error("Error al enviar el informe del estudio:", error);
    return res.status(500).send("Error interno del servidor");
  }
}

module.exports = {
  obtenerMedicos,
  obtenerMedicosPorEspecialidad,
  obtenerMedicoPorID,
  obtenerMedicoPorDNI,
  renderPaginaInicio,
  atenderPaciente,
  renderPlanCMedicos,
  renderFormDiagnostico,
  guardarDiagnostico,
  renderHistoria,
  guardarHistoria,
  renderFormAlta,
  darAltaMedica,
  renderVerInformes,
  renderInformeEnfermeria,
  renderInformeEstudio,
  renderMedicosEspecialistas,
  renderInformeEspecialista, 
  enviarInformeEspecialista
};
