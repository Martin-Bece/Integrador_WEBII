const db = require('../Modelo'); 

async function obtenerMotivos() {
    return await db.motivos.findAll()
}

async function obtenerMotivoPorID(idMotivo) {
    return await db.motivos.findOne({ where: { idMotivo } })
}

module.exports = {obtenerMotivos, obtenerMotivoPorID}