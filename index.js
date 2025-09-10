const express = require('express');
const app = express();
const pug = require('pug');
const path = require('path');
const session = require('express-session')
const db = require('./Modelo');
const { mostrarPortalPaciente, buscarPacientePOST, renderFormularioPaciente, crearPaciente, darDeAlta, darDeBaja, renderNuevoTurno, EspecialidadTurno, confirmarTurno, cancelarTurno } = require('./Controller/PacientesController');
const { mostrarInternaciones } = require('./Controller/InternacionesController');
const { renderFormularioEmergencia, admitirEmergencia, renderFormularioAdmision, admitirTurno, renderFormularioDerivacion, admitirDerivacion, cancelarAdmision } = require('./Controller/admisionesController');
const { POSTBuscarEvaluacion, POSTBuscarSignosV, POSTBuscarEvSignosV, POSTBuscarPlanC } = require('./Controller/enfermeriaController');
const { renderFormularioEvaluacion, guardarHistorial } = require('./Controller/historialController');
const { renderFormularioSignosV, renderTablaEvSignosV, registrarEvFisica } = require('./Controller/signosvController');
const { renderFormularioPlanC, guardarPlan, renderFormularioInforme, guardarInforme, guardarPlanConInforme } = require('./Controller/plancController');
const { getCurrentUser, esAdmision, esEnfermero, autentificarUsuario, esMedico, logout, esMedicoOEnfermero } = require('./Middleware/auth');
const { renderPaginaInicio, atenderPaciente, renderPlanCMedicos, renderFormDiagnostico, guardarDiagnostico, renderHistoria, guardarHistoria, renderFormAlta, darAltaMedica, renderVerInformes, renderInformeEstudio, renderInformeEnfermeria } = require('./Controller/medicosController');

const PORT = 3000;

app.set('view engine', 'pug');
app.set('views', './Vistas');

app.use(session({
  secret: process.env.SESSION_SECRET || 'hospital-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false, 
    maxAge: 24 * 60 * 60 * 1000 
  }
}));

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use(getCurrentUser);

app.get('/', (req, res) =>{
  res.render('index')
});

app.get('/CerrarSesion', logout);

app.post('/login', autentificarUsuario);

app.get('/Admision', esAdmision, (req, res) =>{
    res.render('PaginaInicioAdmision')
});

app.get('/Enfermeria', esEnfermero, (req, res) =>{
    res.render('PaginaInicioEnfermeria')
});

app.get('/Medicos', esMedico, renderPaginaInicio);

// PARTE DE ADMISION

app.get('/BuscarPaciente', esAdmision, (req, res) =>{
    res.render('BuscarPaciente')
})

app.get('/FormularioPaciente', esAdmision, renderFormularioPaciente);

app.get('/PacientesInternados', esAdmision, mostrarInternaciones);

app.post('/cancelarAdmision/:dni', esAdmision, cancelarAdmision);

app.get('/portalPaciente/:dni', esAdmision, mostrarPortalPaciente);

app.get('/Emergencia', esAdmision, renderFormularioEmergencia)

app.post('/emergencia', esAdmision, admitirEmergencia)

app.post('/buscarPaciente', esAdmision, buscarPacientePOST);

app.post('/crearPaciente', esAdmision, crearPaciente)

app.get('/pacientes/baja/:dni', esAdmision, darDeBaja);

app.get('/pacientes/alta/:dni', esAdmision, darDeAlta);

app.get('/NuevoTurno/:dni', esAdmision, renderNuevoTurno);

app.post('/Turnos/Nuevo/:dni', esAdmision, EspecialidadTurno);

app.post('/Turnos/Confirmar', esAdmision, confirmarTurno);

app.get('/turnos/:id/cancelar/:dni', esAdmision, cancelarTurno);

app.get('/turnos/:id/admitir/:dni', esAdmision, renderFormularioAdmision);

app.post('/admisiones/turno', esAdmision, admitirTurno);

app.get('/NuevoAdmitir/:dni', esAdmision, renderFormularioDerivacion);

app.post('/admisiones/derivacion', esAdmision, admitirDerivacion);

// PARTE DE ENFERMERO

app.get('/HistorialDNI', esEnfermero, (req, res) =>{
  res.render('EvaluacionDNI')
})

app.get('/SignosDNI', esEnfermero, (req, res) =>{
  res.render('SignosDNI')
})

app.get('/EvSignosDNI', esEnfermero, (req, res) =>{
  res.render('EvSignosDNI')
})

app.get('/PlanDNI', esEnfermero, (req, res) =>{
  res.render('PlanDNI')
})

app.post('/Enfermeria/evaluacion', esEnfermero, POSTBuscarEvaluacion);

app.get('/Enfermeria/Historial/:dni', esEnfermero, renderFormularioEvaluacion);

app.post('/Enfermeria/signosV', esEnfermero, POSTBuscarSignosV);

app.post('/Enfermeria/EvsignosV', esEnfermero, POSTBuscarEvSignosV);

app.get('/Enfermeria/SignosVitales/:dni', esEnfermero, renderFormularioSignosV);

app.get('/Enfermeria/EvSignosVitales/:dni', esEnfermero, renderTablaEvSignosV);

app.post('/Enfermeria/PlanC', esEnfermero, POSTBuscarPlanC);

app.get('/Enfermeria/PlanCuidados/:dni',esEnfermero, renderFormularioPlanC);

app.post('/enfermeria/guardarHistorial/:dni', esEnfermero, guardarHistorial);

app.post('/enfermeria/evaluacion-fisica/:dni', esEnfermero, registrarEvFisica);

app.post('/enfermeria/guardarPlan/:dni', esMedicoOEnfermero, guardarPlan);

app.post('/enfermeria/guardarPlanConInforme/:dni', esEnfermero, guardarPlanConInforme);

app.get('/enfermeria/informe/:dni', esEnfermero, renderFormularioInforme);

app.post('/enfermeria/enviarInforme', esEnfermero, guardarInforme);

//PARTE DE MEDICOS

app.get('/medicos/atender/:dni', esMedico, atenderPaciente);

app.get('/medicos/plan-cuidados/:dni', esMedico, renderPlanCMedicos);

app.get('/medicos/diagnostico/:dni', esMedico, renderFormDiagnostico);

app.post('/medicos/guardarDiagnostico/:dni', esMedico, guardarDiagnostico);

app.get('/medicos/historia-clinica/:dni', esMedico, renderHistoria);

app.post('/medicos/guardarHistoria/:dni', esMedico, guardarHistoria);

app.get('/medicos/informes/:dni', esMedico, renderVerInformes);

app.get('/medicos/informes/estudio/:dni', esMedico, renderInformeEstudio);

app.get('/medicos/informes/enfermeria/:dni', esMedico, renderInformeEnfermeria);

app.get('/medicos/alta-paciente/:dni', esMedico, renderFormAlta);

app.post('/medicos/guardarInformeAlta/:dni', esMedico, darAltaMedica);

//CONF de la app

app.use((req, res) => {
  res.status(404).render('404');
});

app.use((err,req, res) => {
  console.error(err.stack);
  res.status(500).render('500');
});


db.sequelize.sync({force:false})
  .then(()=>{
    console.log('Conexion a la BD realizada correctamente.');
    app.listen(PORT,()=>{
    console.log("Se inicio el servidor en el puerto: "+ PORT)
});
  })
  .catch( err =>{
    console.error('Error al acceder a la BD: ', err)
  })