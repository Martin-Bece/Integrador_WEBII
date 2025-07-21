const db = require('../Modelo');
const { obtenerSintomas, buscarSintomaPorMotivo } = require('./sintomasController');
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

    const paciente = await buscarPacientePorDNI(dni);
    const admisiones = await FiltrarAdmisionPorDNI(dni);
    const admision = admisiones[0];
    const sintomas = await buscarSintomaPorMotivo(admision.motivo_id);
    const historial = await buscarHistorialporDNI(dni);


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



module.exports = {renderFormularioEvaluacion}