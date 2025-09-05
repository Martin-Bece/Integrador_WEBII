const db = require('../Modelo');
const { Medicos, Admision, Turnos, Pacientes, Motivos, Sintomas } = db;

async function obtenerMedicos() {
  return await db.medicos.findAll();
}

async function obtenerMedicoPorID(idMedico) {
  return await db.medicos.findOne({ where: { idMedico } });
}

async function obtenerMedicosPorEspecialidad(idEspecialidad) {
  return await db.medicos.findAll({ where: { idEspecialidad } });
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

module.exports = { obtenerMedicos, obtenerMedicosPorEspecialidad, obtenerMedicoPorID, renderPaginaInicio };
