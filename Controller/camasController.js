const db = require('../Modelo'); 

async function obtenerCamas() {
    return await db.camas.findAll();
}

async function obtenerCamasPorHab(idHabitacion) {
    return await db.camas.findAll({where: {habitacion_id: idHabitacion, estado: 'libre'}})
}

async function obtenerCamasOcupadas(idHabitacion) {
    return await db.camas.findAll({
        where: {
            habitacion_id: idHabitacion, 
            estado: 'ocupada'
        },
        include: {
          model: db.admisiones,
          as: 'admisiones',
          where: { estado: 'Activa' },
          include: {
            model: db.pacientes,
            as: 'paciente',
            attributes: ['sexo']
          }
        }
    })
}

async function ocuparCama(camaId) {
  await db.camas.update(
    { estado: 'ocupada' },
    { where: { idCama: camaId } }
  );
}

async function AsignarCama(pacienteId, habitaciones) {
    const paciente = await db.pacientes.findByPk(pacienteId);
    const sexo = paciente.sexo;

    for (const habitacion of habitaciones) {
        const camas = await obtenerCamasPorHab(habitacion.idHabitacion)
    
        for (const cama of camas) {
            
            if (habitacion.capacidad === 1) {
                await ocuparCama(cama.idCama);
                return cama;
            }

            const camasOcupadas = await obtenerCamasOcupadas(habitacion.idHabitacion)
            if (camasOcupadas.length === 0) {
                await ocuparCama(cama.idCama);
                return cama;
            }

            const otroS = camasOcupadas[0].admisiones[0].paciente.sexo;
            if (otroS === sexo) {
                await ocuparCama(cama.idCama)
                return cama;
            }
        }
    }
    return null;
}

async function liberarCama(idCama) {
  await db.camas.update(
    { estado: 'libre' },
    { where: { idCama } }
  );
}

module.exports = { obtenerCamas, obtenerCamasPorHab, AsignarCama, liberarCama}