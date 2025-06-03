const db = require('../Modelo');

async function mostrarInternaciones(req, res) {
    
try {
    const internados = await db.admisiones.findAll({
      where: { estado: 'Activa' },
      include: [
        {
          model: db.pacientes,
          as: 'paciente',
          attributes: ['dni', 'nombre', 'apellido']
        },
        {
          model: db.habitaciones,
          as: 'habitacion',
          attributes: ['numero']
        }
      ]
    });

    res.render('PacientesInternados', { internados });
  } catch (error) {
    console.error('Error al obtener internados:', error);
    res.render('500');
  }
}

module.exports = { mostrarInternaciones };