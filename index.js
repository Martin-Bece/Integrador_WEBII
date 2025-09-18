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
const { getCurrentUser, esAdmision, esEnfermero, autentificarUsuario, esMedico, logout, esMedicoOEnfermero, esAdmin } = require('./Middleware/auth');
const { renderPaginaInicio, atenderPaciente, renderPlanCMedicos, renderFormDiagnostico, guardarDiagnostico, renderHistoria, guardarHistoria, renderFormAlta, darAltaMedica, renderVerInformes, renderInformeEstudio, renderInformeEnfermeria } = require('./Controller/medicosController');
const { renderListaUsuarios, renderFormUsuario, renderFormCambiarContraseña, postCambiarContraseña, crearUsuarioNuevo, actualizarUsuarioExistente, eliminarUsuarioLista, renderConfirmarEliminar, renderResumen, renderAdminPaciente, renderAdminMedico, renderAdminEmpleadoAdm, renderAdminEspecialidad, renderAdminEnfermeros, renderAdminCamas, renderAdminUnidades, renderAdminHabitaciones, renderAdminAdmisiones, renderAdminMutuales, renderformMutual, renderformPaciente, renderformMedico, renderformEmpAdmision, renderformEspecialidad, renderformEnfermero, renderformCamas, renderformUnidad, renderformHabitacion, renderformAdmision } = require('./Controller/adminController');

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

app.get('/Administracion', esAdmin, (req, res) =>{
  res.render('PaginaInicioAdmin');
})

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

//PARTE DE ADMINISTRACION

//usuarios
app.get('/admin/usuarios', esAdmin, renderListaUsuarios);

app.get('/admin/usuarios/nuevo', esAdmin, renderFormUsuario);

app.get('/admin/usuarios/editar/:id', esAdmin, renderFormUsuario);

app.get('/admin/usuarios/cambiar-contrasea/:id', esAdmin, renderFormCambiarContraseña)

app.post('/admin/usuarios/cambiar-contrasea/:id', esAdmin, postCambiarContraseña)

app.post('/admin/usuarios/nuevo', esAdmin, crearUsuarioNuevo);

app.post('/admin/usuarios/editar/:id', esAdmin, actualizarUsuarioExistente);

app.get('/admin/usuarios/eliminar/:id', esAdmin, renderConfirmarEliminar);

app.post('/admin/usuarios/eliminar-confirmado/:id', esAdmin, eliminarUsuarioLista);

app.get('/admin/resumen', esAdmin, renderResumen);

//ABMC de entidades
app.get('/admin/entidades', esAdmin, (req, res) =>{
  res.render('GestionEntidades');
})

//pacientes
app.get('/admin/pacientes', esAdmin, renderAdminPaciente);

app.get('/admin/pacientes/editar/:id', esAdmin, renderformPaciente)

app.get('/admin/pacientes/nuevo', esAdmin, renderformPaciente)

//medicos
app.get('/admin/medicos', esAdmin, renderAdminMedico);

app.get('/admin/medicos/editar/:id', esAdmin, renderformMedico);

app.get('/admin/medicos/nuevo', esAdmin, renderformMedico);

//emp admision
app.get('/admin/empleados-admision', esAdmin, renderAdminEmpleadoAdm);

app.get('/admin/empleados/editar/:id', esAdmin, renderformEmpAdmision);

app.get('/admin/empleados/nuevo', esAdmin, renderformEmpAdmision);

//especialidades
app.get('/admin/especialidades', esAdmin, renderAdminEspecialidad);

app.get('/admin/especialidades/editar/:id', esAdmin, renderformEspecialidad);

app.get('/admin/especialidades/nuevo', esAdmin, renderformEspecialidad);

//enfermeros
app.get('/admin/enfermeros', esAdmin, renderAdminEnfermeros);

app.get('/admin/enfermeros/editar/:id', esAdmin, renderformEnfermero);

app.get('/admin/enfermeros/nuevo', esAdmin, renderformEnfermero);

//camas
app.get('/admin/camas', esAdmin, renderAdminCamas);

app.get('/admin/camas/editar/:id', esAdmin, renderformCamas);

app.get('/admin/camas/nuevo', esAdmin, renderformCamas);

//unidades
app.get('/admin/unidades', esAdmin, renderAdminUnidades);

app.get('/admin/unidades/editar/:id', esAdmin, renderformUnidad);

app.get('/admin/unidades/nuevo', esAdmin, renderformUnidad);

//habitaciones
app.get('/admin/habitaciones', esAdmin, renderAdminHabitaciones);

app.get('/admin/habitaciones/editar/:id', esAdmin, renderformHabitacion);

app.get('/admin/habitaciones/nuevo', esAdmin, renderformHabitacion);

//admisiones
app.get('/admin/admisiones', esAdmin, renderAdminAdmisiones);

app.get('/admin/admisiones/editar/:id', esAdmin, renderformAdmision);

app.get('/admin/admisiones/nuevo', esAdmin, renderformAdmision);

//mutuales
app.get('/admin/mutuales', esAdmin, renderAdminMutuales);

app.get('/admin/mutuales/editar/:id', esAdmin, renderformMutual);

app.get('/admin/mutuales/nuevo', esAdmin, renderformMutual);


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