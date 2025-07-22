const db = require('../Modelo');
const { buscarPorDNI } = require('./PacientesController');

async function renderTablaEvSignosV(req, res, datosAdicionales = {}) {
  try {
    const dni = req.params.dni || req.query.dni || '';

    const paciente = await buscarPorDNI(dni);

    const evaluaciones = await db.evaluacion_fisica.findAll({
      where: { id_paciente: paciente.idPaciente },
      order: [['fecha_hora', 'DESC']]
    });

    res.render('SignosPasados', {
      dni,
      paciente,
      evaluaciones,
      ...datosAdicionales
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al cargar el formulario');
  }
}

async function renderFormularioSignosV(req, res, datosAdicionales = {}) {
  try {

    const dni = req.params.dni || req.query.dni || '';

    const paciente = await buscarPorDNI(dni);

    res.render('FormSignosV', {
      dni,
      paciente,
      ...datosAdicionales
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al cargar el formulario');
  }
}

async function registrarEvFisica(req, res) {
  const evaluacion = req.body;

  if (
    !evaluacion.id_paciente,
    !evaluacion.presion_arterial,
    !evaluacion.frecuencia_respiratoria,
    !evaluacion.temperatura_corporal,
    !evaluacion.color_piel,
    !evaluacion.observaciones
  ) {
    return renderFormularioSignosV(req, res, {error: "Complete todos los campos por favor."});
  }

  try {
    await db.evaluacion_fisica.create(evaluacion);
    res.redirect(`/Enfermeria`);

  } catch (error) {
      console.error(error);
      return renderFormularioSignosV(req, res, { error: "Error interno al crear el historial"});
  }

}


module.exports = {renderFormularioSignosV, renderTablaEvSignosV, registrarEvFisica}