const express = require('express');
const app = express();
const pug = require('pug');
const path = require('path');
const db = require('./Modelo');
const { mostrarPortalPaciente, buscarPacientePOST, renderFormularioPaciente, crearPaciente, darDeAlta, darDeBaja } = require('./Controller/PacientesController');

const PORT = 3000;

app.set('view engine', 'pug');
app.set('views', './vistas');

app.use(express.urlencoded({extended: true}));
app.use(express.json());


app.get('/', (req, res) =>{
    res.render('Paginainicio')
});

app.get('/BuscarPaciente', (req, res) =>{
    res.render('BuscarPaciente')
})

app.get('/FormularioPaciente', renderFormularioPaciente);


app.get('/PacientesInternados', (req, res) =>{
    res.render('PacientesInternados')
})

app.get('/portalPaciente/:dni', mostrarPortalPaciente);

app.get('/formAdmision', (req, res) =>{
    const motivos = [
  { id: 1, nombre: 'Observación clínica' },
  { id: 2, nombre: 'Cirugía programada' },
  { id: 3, nombre: 'Tratamiento intensivo' },
  { id: 4, nombre: 'Control postoperatorio' },
  { id: 5, nombre: 'Descompensación crónica' }
];

const origenes = [
  { id: 1, nombre: 'Guardia' },
  { id: 2, nombre: 'Derivado de consultorio' },
  { id: 3, nombre: 'Derivado de otro hospital' },
  { id: 4, nombre: 'Internación domiciliaria' },
  { id: 5, nombre: 'Sala de espera' }
];
    res.render('formAdmision', { motivos, origenes });
})

app.get('/Emergencia', (req, res) =>{
    res.render('formEmergencia')
})

app.post('/buscarPaciente', buscarPacientePOST);

app.post('/crearPaciente', crearPaciente)

app.get('/pacientes/baja/:dni', darDeBaja);

app.get('/pacientes/alta/:dni', darDeAlta);

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