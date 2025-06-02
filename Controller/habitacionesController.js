const db = require('../Modelo'); 

async function obtenerHabitaciones() {
    return await db.habitaciones.findAll();
}

async function obtenerHabsPorID(id) {
    return await db.habitaciones.findByPk(id);
}

async function obtenerHabsPorUnidad(idUnidad) {
    return await db.habitaciones.findAll(
        {where: {unidad_id: idUnidad}})
}

async function obtenerHabsPorNumero(numero) {
    return await db.habitaciones.findAll(
        {where: {numero: numero}})
}

module.exports = { obtenerHabitaciones, obtenerHabsPorUnidad, obtenerHabsPorNumero, obtenerHabsPorID }