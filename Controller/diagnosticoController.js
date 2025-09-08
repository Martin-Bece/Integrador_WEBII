const db = require('../Modelo');

async function obtenerDiagnosticoPorID(idPaciente) {
    return await db.diagnostico.findOne( {where: {idPaciente}})
}

module.exports = {obtenerDiagnosticoPorID}