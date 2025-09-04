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
    const idPaciente = paciente.dataValues ? paciente.dataValues.idPaciente : paciente.idPaciente;

    const planCuidados = await buscarPlanPorID(idPaciente);

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
        !planCuidados.id_enfermero
    ) {
        return renderFormularioPlanC(req, res, {error: "Complete todos los campos por favor.", planCuidados, dni})
    }

    try {
        const planExistente = await buscarPlanPorID(planCuidados.id_paciente);

        if (planExistente) {
        await db.plan_de_cuidados.update(planCuidados, {
          where: { id_paciente: planCuidados.id_paciente }
        });
        } else {
          await db.plan_de_cuidados.create(planCuidados);
        }
        res.redirect(`/Enfermeria`);
    } catch (error) {
        console.error(error);
        return renderFormularioPlanC(req, res, { error: "Error interno al crear el historial"}, planCuidados, dni);
    }
}

async function guardarPlanConInforme(req, res) {
    const planCuidados = req.body;
    const dni = req.params.dni;

    if (!planCuidados.intervenciones_inmediatas || !planCuidados.medicamentos || !planCuidados.tratamiento) {
      return renderFormularioPlanC(req, res, { error: "Complete todos los campos", planCuidados });
    }

    try {
      const planExistente = await buscarPlanPorID(planCuidados.id_paciente);

      if (planExistente) {
        await db.plan_de_cuidados.update(planCuidados, {
          where: { id_paciente: planCuidados.id_paciente }
      });
      } else {
        await db.plan_de_cuidados.create(planCuidados);
      }
      res.redirect(`/enfermeria/informe/${dni}`);
    } catch (error) {
      console.error(error);
      return renderFormularioPlanC(req, res, { error: "Error interno", planCuidados });
    }
  }

async function renderFormularioInforme(req, res) {
    const dni = req.params.dni || req.query.dni || req.body.dni;
    if (!dni) {
      return res.status(400).send("DNI del paciente no especificado");
    }

    const paciente = await db.pacientes.findOne({ where: { dni } });
    const dniEnfermero = req.session.usuario.dni || '';
    const enfermero = await buscarEnfermeroPorDNI(dniEnfermero);

    res.render('FormInforme', { paciente, enfermero });
  }


async function guardarInforme(req, res) {  
  const informeData = {
      id_enfermero: parseInt(req.body.id_enfermero),
      informe: req.body.informe
    };
    const dni = req.body.dni || '';

    const paciente = await buscarPorDNI(dni);

    const admisiones = await FiltrarAdmisionPorDNI(dni);
    const admision = admisiones[0];

    const idMotivo = admision.motivo_id;

    const motivo = await obtenerMotivoPorID(idMotivo);

    const idEspecialidad = motivo.idEspecialidad;

    informeData.id_especialidad = idEspecialidad;    
    informeData.id_paciente = paciente.idPaciente;


    if (!informeData.informe) {
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




module.exports = {renderFormularioPlanC, guardarPlan, renderFormularioInforme, guardarInforme, guardarPlanConInforme};