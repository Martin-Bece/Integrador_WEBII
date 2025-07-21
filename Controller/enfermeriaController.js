const db = require('../Modelo'); 

async function buscarPacientePorDNI(dni) {
    const paciente = await db.pacientes.findOne({ where: { dni } });
    return paciente;
}

async function POSTBuscarEvaluacion(req, res) {
  const dni = req.body.dni;

  if (dni == '') {
    return res.render('EvaluacionDNI', {
            error: 'Complete los campos',
        });
  }

  try {
    const paciente = await buscarPacientePorDNI(dni);

    if (paciente) {

        return res.redirect(`/Enfermeria/Historial/${paciente.dni}`);

    } else {
        return res.render('EvaluacionDNI', {
            error: 'El paciente no existe o no se encuentra cargado.',
        });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Error interno del servidor');
  }
}

async function renderFormularioSignosV(req, res, datosAdicionales = {}) {
  try {

    const dni = req.params.dni || req.query.dni || '';

    const paciente = await buscarPacientePorDNI(dni);


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

async function POSTBuscarSignosV(req, res) {
  const dni = req.body.dni;

  if (dni == '') {
    return res.render('SignosDNI', {
            error: 'Complete los campos',
        });
  }

  try {
    const paciente = await buscarPacientePorDNI(dni);

    if (paciente) {

        return res.redirect(`/Enfermeria/SignosVitales/${paciente.dni}`);

    } else {
        return res.render('SignosDNI', {
            error: 'El paciente no existe o no se encuentra cargado.',
        });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Error interno del servidor');
  }
}

async function renderFormularioPlanC(req, res, datosAdicionales = {}) {
  try {

    const dni = req.params.dni || req.query.dni || '';
    const idEnfermero = req.session?.idEnfermero || '';

    const paciente = await buscarPacientePorDNI(dni);


    res.render('FormPlanC', {
      dni,
      paciente,
      idEnfermero,
      ...datosAdicionales
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al cargar el formulario');
  }
}

async function POSTBuscarPlanC(req, res) {
  const dni = req.body.dni;

  if (dni == '') {
    return res.render('PlanDNI', {
            error: 'Complete los campos',
        });
  }

  try {
    const paciente = await buscarPacientePorDNI(dni);

    if (paciente) {

        return res.redirect(`/Enfermeria/PlanCuidados/${paciente.dni}`);

    } else {
        return res.render('PlanDNI', {
            error: 'El paciente no existe o no se encuentra cargado.',
        });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Error interno del servidor');
  }
}


module.exports = {POSTBuscarEvaluacion, renderFormularioSignosV, POSTBuscarSignosV, POSTBuscarPlanC, renderFormularioPlanC}