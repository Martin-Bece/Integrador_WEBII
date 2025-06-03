const db = require('../Modelo'); 

async function obtenerMotivos() {
    return await db.motivos.findAll()
}

async function obtenerMotivoPorID(idMotivo) {
    return await db.motivos.findOne({ where: { idMotivo } })
}

async function obtenerMotivoPorEspecialidad(idEspecialidad) {
    return await db.motivos.findAll({ where: { idEspecialidad } })
}

module.exports = {obtenerMotivos, obtenerMotivoPorID, obtenerMotivoPorEspecialidad}