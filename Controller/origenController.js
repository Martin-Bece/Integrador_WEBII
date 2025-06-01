const db = require('../Modelo'); 

async function obtenerOrigenPorNombre(nombre) {
    return origen = await db.origenes.findOne({ where: { nombre } })
}

module.exports = {obtenerOrigenPorNombre}