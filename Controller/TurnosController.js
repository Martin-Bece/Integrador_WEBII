const { where } = require('sequelize');
const db = require('../Modelo'); 

async function obtenerTurnosPorDNI(dni){
    const turnos = await db.turnos.findAll({
        where: {estado: 'pendiente'},
        include: {
            model: db.pacientes,
            as: 'paciente', 
            attributes: ['nombre', 'apellido', 'dni'],
            where: { dni: dni } 
        }
    });
    return turnos;
}

async function obtenerTurnoPorID(idTurno) {
    return await db.turnos.findByPk(idTurno);
}



module.exports = {
    obtenerTurnosPorDNI,
    obtenerTurnoPorID
}