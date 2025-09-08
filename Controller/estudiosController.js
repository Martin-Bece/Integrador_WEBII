const db = require('../Modelo');

async function obtenerEstudios() {
    return await db.estudios.findAll()
}

module.exports = {obtenerEstudios}