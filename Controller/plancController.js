const db = require('../Modelo'); 
const { FiltrarAdmisionPorDNI } = require('./admisionesController');
const { buscarEnfermeroPorDNI } = require('./enfermeriaController');
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
    const dniEnfermero = req.session.usuario.dni || '';
    const enfermero = await buscarEnfermeroPorDNI(dniEnfermero);

    const paciente = await buscarPorDNI(dni);
    const idPaciente = paciente.idPaciente

    const planCuidados = await buscarPlanPorID(idPaciente);

    console.log(paciente);
    console.log(enfermero);


    res.render('FormPlanC', {
      dni,
      paciente,
      enfermero,
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
    const dni = req.params.dni || req.query.dni || req.body.dni || '';

    if (
        !planCuidados.intervenciones_inmediatas ||
        !planCuidados.medicamentos ||
        !planCuidados.tratamiento ||
        !planCuidados.idEnfermero
    ) {
        return renderFormularioPlanC(req, res, {error: "Complete todos los campos por favor.", planCuidados, dni})
    }

    try {
        await db.plan_de_cuidados.create(planCuidados);

        res.redirect(`/Enfermeria`);
    } catch (error) {
        console.error(error);
        return renderFormularioPlanC(req, res, { error: "Error interno al crear el historial"}, planCuidados, dni);
    }
}

async function renderFormularioInforme(req, res, datosAdicionales = {}) {
  try {

    const dni = req.params.dni || req.query.dni || '';
    const dniEnfermero = req.session.usuario.dni || '';
    const enfermero = await buscarEnfermeroPorDNI(dniEnfermero);

    const paciente = await buscarPorDNI(dni);
    const admisiones = await FiltrarAdmisionPorDNI(dni);
    const admision = admisiones[0];
    const motivo = obtenerMotivoPorID(admision.motivo_id);
    const medicos = await obtenerMedicosPorEspecialidad(motivo.idEspecialidad);


    res.render('FormInforme', {
      dni,
      paciente,
      enfermero,
      medicos,
      ...datosAdicionales
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al cargar el formulario');
  }
}

async function guardarInforme(req, res) {
    const informeData = req.body;
    const dni = req.params.dni || req.query.dni || req.body.dni || '';


    if (!informeData.id_medico || !informeData.informe) {
        return renderFormularioInforme(req, res, {
            error: "Complete todos los campos por favor.",
            informeData,
            dni
        });
    }
    try {
        await db.informe_enfermero.create(informeData);

        res.redirect(`/Enfermeria`);
    } catch (error) {
        console.error(error);
        return renderFormularioInforme(req, res, {
            error: "Error interno al guardar el informe.",
            informeData,
            dni
        });
    }
}




module.exports = {renderFormularioPlanC, guardarPlan, renderFormularioInforme, guardarInforme};