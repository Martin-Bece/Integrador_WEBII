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



module.exports = {
    obtenerTurnosPorDNI
}