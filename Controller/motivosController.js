const db = require('../Modelo'); 

async function obtenerMotivos() {
    return motivos = await db.motivos.findAll()
}

module.exports = {obtenerMotivos}