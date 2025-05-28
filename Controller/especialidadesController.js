const db = require('../Modelo'); 

async function obtenerEspecialidades(){
    return await db.especialidades.findAll();
}

async function obtenerEspecialidadPorID(idEspecialidad) {
    return await db.especialidades.findOne({ where: { idEspecialidad } })
}

module.exports = {obtenerEspecialidades, obtenerEspecialidadPorID}