const express = require('express');
const app = express();
const pug = require('pug');
const path = require('path');
const db = require('./Modelo');
const { mostrarPortalPaciente, buscarPacientePOST, renderFormularioPaciente, crearPaciente, darDeAlta, darDeBaja, renderNuevoTurno, EspecialidadTurno, confirmarTurno, cancelarTurno } = require('./Controller/PacientesController');
const { mostrarInternaciones } = require('./Controller/InternacionesController');
const { renderFormularioEmergencia, admitirEmergencia, renderFormularioAdmision, admitirTurno, renderFormularioDerivacion, admitirDerivacion } = require('./Controller/admisionesController')

const PORT = 3000;

app.set('view engine', 'pug');
app.set('views', './Vistas');

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.get('/', (req, res) =>{
  res.render('index')
})

app.get('/Admision', (req, res) =>{
    res.render('PaginaInicioAdmision')
});

app.get('/Enfermeria', (req, res) =>{
    res.render('PaginaInicioEnfermeria')
});

app.get('/BuscarPaciente', (req, res) =>{
    res.render('BuscarPaciente')
})

app.get('/FormularioPaciente', renderFormularioPaciente);


app.get('/PacientesInternados',mostrarInternaciones);

app.get('/portalPaciente/:dni', mostrarPortalPaciente);

app.get('/Emergencia', renderFormularioEmergencia)

app.post('/emergencia', admitirEmergencia)

app.post('/buscarPaciente', buscarPacientePOST);

app.post('/crearPaciente', crearPaciente)

app.get('/pacientes/baja/:dni', darDeBaja);

app.get('/pacientes/alta/:dni', darDeAlta);

app.get('/NuevoTurno/:dni', renderNuevoTurno);

app.post('/Turnos/Nuevo/:dni', EspecialidadTurno);

app.post('/Turnos/Confirmar', confirmarTurno);

app.get('/turnos/:id/cancelar/:dni', cancelarTurno);

app.get('/turnos/:id/admitir/:dni', renderFormularioAdmision);

app.post('/admisiones/turno', admitirTurno);

app.get('/NuevoAdmitir/:dni', renderFormularioDerivacion);

app.post('/admisiones/derivacion', admitirDerivacion);

app.get('/HistorialDNI', (req, res) =>{
  res.render('EvaluacionDNI')
})

app.get('/SignosDNI', (req, res) =>{
  res.render('SignosDNI')
})

app.get('/PlanDNI', (req, res) =>{
  res.render('PlanDNI')
})

app.get('/forma', (req, res) =>{
  res.render('FormPlanC')
})

app.get('/formb', (req, res) =>{
  res.render('FormInforme')
})

app.use((req, res) => {
  res.status(404).render('404');
});

app.use((err,req, res) => {
  console.error(err.stack);
  res.status(500).render('500');
});


db.sequelize.sync({force:false, alter: true})
  .then(()=>{
    console.log('Conexion a la BD realizada correctamente.');
    app.listen(PORT,()=>{
    console.log("Se inicio el servidor en el puerto: "+ PORT)
});
  })
  .catch( err =>{
    console.error('Error al acceder a la BD: ', err)
  })