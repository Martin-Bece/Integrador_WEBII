const db = require('../Modelo'); 

async function obtenerMedicos(){
  return await db.medicos.findAll();
}

async function obtenerMedicoPorID(idMedico) {
  return await db.medicos.findOne({ where: { idMedico } })
}
async function obtenerMedicosPorEspecialidad(idEspecialidad) {
  return await db.medicos.findAll({
    where: { idEspecialidad: idEspecialidad }
  });
}

async function renderPaginaInicio(req, res, datosAdicionales = {}) {
  
}

module.exports = {obtenerMedicos, obtenerMedicosPorEspecialidad, obtenerMedicoPorID}