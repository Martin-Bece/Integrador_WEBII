const db = require('../Modelo');
const { obtenerSintomas, buscarSintomaPorMotivo } = require('./sintomasController');
const { buscarPorDNI } = require('./PacientesController');

const { FiltrarAdmisionPorDNI } = require('./admisionesController');

async function buscarHistorialporDNI(dni) {
  try {
    const paciente = await db.pacientes.findOne({ where: { dni } });
    if (!paciente) {
      return null;
    }
    const historial = await db.historial_medico.findOne({
      where: { idPaciente: paciente.idPaciente }
    });
    return historial; 
  } catch (error) {
    console.error('Error en buscarHistorialporDNI:', error);
    throw error;
  }
}


async function renderFormularioEvaluacion(req, res, datosAdicionales = {}) {
  try {

    const dni = req.params.dni || req.query.dni || '';

    const paciente = await buscarPorDNI(dni);
    const admisiones = await FiltrarAdmisionPorDNI(dni);
    const admision = admisiones[0];
    const sintomas = await buscarSintomaPorMotivo(admision.motivo_id);
    const historialAUX = await buscarHistorialporDNI(dni);
    const historial = historialAUX || {
      enfermedades_previas: '',
      cirugias: '',
      alergias: '',
      medicamentos_actuales: '',
      antecedentes_familiares: '',
      contacto_emergencia: '',
      idSintoma: '',
      idPaciente: paciente?.idPaciente || ''
    };



    res.render('HistorialMedico', {
      dni,
      paciente,
      sintomas,
      historial,
      ...datosAdicionales
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al cargar el formulario');
  }
}

async function guardarHistorial(req, res) {
  const historial = req.body;
  const dni = req.params.dni;

  if (
    !historial.idPaciente ||
    !historial.enfermedades_previas ||
    !historial.cirugias ||
    !historial.alergias ||
    !historial.medicamentos_actuales ||
    !historial.antecedentes_familiares ||
    !historial.contacto_emergencia
  ) {
    return renderFormularioEvaluacion(req, res, {error: "Complete todos los campos por favor.", historial})
  }

  try {
    const paciente = await db.pacientes.findOne({ where: { dni } });
    historial.idPaciente = paciente.idPaciente;

    const historialExistente = await db.historial_medico.findOne({ where: { idPaciente: paciente.idPaciente } });
    if (historialExistente) {
      await db.historial_medico.update(historial, { where: { idPaciente: paciente.idPaciente } });
    } else {
      await db.historial_medico.create(historial);
    }

    res.redirect(`/Enfermeria`);
  } catch (error) {
    console.error(error);
    return renderFormularioEvaluacion(req, res, { error: "Error interno al crear el historial", historial });
  }
}



module.exports = {renderFormularioEvaluacion, guardarHistorial}