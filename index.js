const express = require('express');
const app = express();
const pug = require('pug');
const path = require('path');
const db = require('./Modelo');
const { where } = require('sequelize');

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

app.get('/portalPaciente/:dni', async (req, res) => {
  const dni = req.params.dni;

  try {
    const paciente = await db.pacientes.findOne({ where: { dni } });
    if (!paciente) return res.status(404).send('Paciente no encontrado');

    const turnos = await db.turnos.findAll({
      where: { paciente_id: paciente.idPaciente }
    });

    res.render('portalPaciente', { paciente, turnos });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error interno');
  }
});

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

app.post('/BuscarPaciente', async (req, res) =>{
  
    const dni  = req.body.dni;

    const paciente = await db.pacientes.findOne({where: { dni }});

    if (paciente) {
      res.redirect('/portalPaciente/' + dni);
    } else {
      res.status(404).send('Paciente no encontrado');
    }
  });

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