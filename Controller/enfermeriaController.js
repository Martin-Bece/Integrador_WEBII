const { where } = require('sequelize');
const db = require('../Modelo'); 

async function buscarEnfermeroPorDNI(dni) {
  return await db.enfermeros.findOne({ where: { dni } });
}

async function buscarEnfermeroPorID(idEnfermero) {
  return await db.enfermeros.findOne({ where: { idEnfermero } });
}

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

async function POSTBuscarEvSignosV(req, res) {
  const dni = req.body.dni;

  if (dni == '') {
    return res.render('EvSignosDNI', {
            error: 'Complete los campos',
        });
  }

  try {
    const paciente = await buscarPacientePorDNI(dni);

    if (paciente) {

        return res.redirect(`/Enfermeria/EvSignosVitales/${paciente.dni}`);

    } else {
        return res.render('EvSignosDNI', {
            error: 'El paciente no existe o no se encuentra cargado.',
        });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Error interno del servidor');
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

async function obtenerEnfermeros() {
  return await db.enfermeros.findAll();
}


module.exports = {POSTBuscarEvaluacion, POSTBuscarEvSignosV, POSTBuscarSignosV, POSTBuscarPlanC, buscarEnfermeroPorDNI, buscarEnfermeroPorID, obtenerEnfermeros}