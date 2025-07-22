const db = require('../Modelo'); 
const { FiltrarAdmisionPorDNI } = require('./admisionesController');
const { obtenerMedicos, obtenerMedicosPorEspecialidad } = require('./medicosController');
const { obtenerMotivoPorID } = require('./motivosController');
const { buscarPorDNI } = require('./PacientesController');

async function buscarPlanPorID(idPaciente) {
  try {
    const plan = await db.plan_de_cuidados.findOne({
      where: { id_paciente: idPaciente }
    });
    return plan;
  } catch (error) {
    console.error('Error al buscar plan de cuidados:', error);
    throw error;
  }
}


async function renderFormularioPlanC(req, res, datosAdicionales = {}) {
  try {

    const dni = req.params.dni || req.query.dni || '';
    const idEnfermero = req.session?.idEnfermero || '';

    const paciente = await buscarPorDNI(dni);

    const planCuidados = buscarPlanPorID(paciente.idPaciente);


    res.render('FormPlanC', {
      dni,
      paciente,
      idEnfermero,
      planCuidados,
      ...datosAdicionales
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al cargar el formulario');
  }
}

async function guardarPlan(req, res) {
    
    const planCuidados = req.body;

    if (
        !planCuidados.intervenciones_inmediatas ||
        !planCuidados.medicamentos ||
        !planCuidados.tratamiento
    ) {
        return renderFormularioPlanC(req, res, {error: "Complete todos los campos por favor.", planCuidados})
    }

    try {
        planCuidados.idEnfermero = 1;
        await db.plan_de_cuidados.create(planCuidados);

        res.redirect(`/Enfermeria`);
    } catch (error) {
        console.error(error);
        return renderFormularioPlanC(req, res, { error: "Error interno al crear el historial"}, planCuidados);
    }
}

async function renderFormularioInforme(req, res, datosAdicionales = {}) {
  try {

    const dni = req.params.dni || req.query.dni || '';
    const idEnfermero = req.session?.idEnfermero || '';

    const paciente = await buscarPorDNI(dni);
    const admisiones = await FiltrarAdmisionPorDNI(dni);
    const admision = admisiones[0];
    const motivo = obtenerMotivoPorID(admision.motivo_id);
    const medicos = await obtenerMedicosPorEspecialidad(motivo.idEspecialidad);


    res.render('FormInforme', {
      dni,
      paciente,
      idEnfermero,
      medicos,
      ...datosAdicionales
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al cargar el formulario');
  }
}



module.exports = {renderFormularioPlanC, guardarPlan, renderFormularioInforme};