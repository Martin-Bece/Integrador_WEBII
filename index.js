const express = require('express');
const app = express();
const pug = require('pug');
const path = require('path');
const { sequelize } = require('./Modelo');

const PORT = 3000;

app.set('view engine', 'pug');
app.set('views', './vistas');

app.use(express.urlencoded({extended: false}));
app.use(express.json());


app.get('/', (req, res) =>{
    res.render('Paginainicio')
});

app.get('/BuscarPaciente', (req, res) =>{
    res.render('BuscarPaciente')
})

app.get('/FormularioPaciente', (req, res) =>{
    res.render('FormularioPaciente')
})

app.get('/PacientesInternados', (req, res) =>{
    res.render('PacientesInternados')
})

app.get('/portalPaciente', (req, res) =>{
    res.render('portalPaciente', {
  paciente: {
    idPaciente: 1,
    nombre: 'Juan',
    apellido: 'Pérez',
    dni: '12345678',
    fecha_nacimiento: '1985-06-01',
    sexo: 'Masculino',
    telefono: '123456789',
    direccion: 'Calle Falsa 123',
    mutual: 'OSDE',
    
  },
  turnos: [
    {
      id: 1,
      fecha: '2025-05-24',
      hora: '10:30',
      idEspecialidad: 'Clínica Médica',
      idMedico: 'Dr. López',
      estado: 'Pendiente'
    },
    {
      id: 2,
      fecha: '2025-05-28',
      hora: '14:00',
      idEspecialidad: 'Cardiología',
      idMedico: 'Dra. Torres',
      estado: 'Pendiente'
    }
  ]
});
})

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

app.use((req, res) => {
  res.status(404).render('404');
});

app.use((err,req, res) => {
  console.error(err.stack);
  res.status(500).render('500');
});


sequelize.sync({force:false})
  .then(()=>{
    console.log('Conexion a la BD realizada correctamente.');
    app.listen(PORT,()=>{
    console.log("Se inicio el servidor en el puerto: "+ PORT)
});
  })
  .catch( err =>{
    console.error('Error al acceder a la BD: ', err)
  })