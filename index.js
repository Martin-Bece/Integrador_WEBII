const express = require('express');
const app = express();
const pug = require('pug');

const PORT = 3000;

app.set('view engine', 'pug');
app.set('views', './vistas');


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
    id: 1,
    nombre: 'Juan',
    apellido: 'Pérez',
    dni: '12345678',
    fechaNacimiento: '1985-06-01',
    sexo: 'Masculino',
    telefono: '123456789',
    direccion: 'Calle Falsa 123',
    contactoEmergencia: 'Ana Pérez',
    origen: 'Guardia',
    seguroNombre: 'OSDE',
    seguroNumero: '998877',
    motivo: 'Dolor abdominal'
  },
  turnos: [
    {
      id: 1,
      fecha: '2025-05-24',
      hora: '10:30',
      especialidad: 'Clínica Médica',
      profesional: 'Dr. López',
      estado: 'Pendiente'
    },
    {
      id: 2,
      fecha: '2025-05-28',
      hora: '14:00',
      especialidad: 'Cardiología',
      profesional: 'Dra. Torres',
      estado: 'Pendiente'
    }
  ]
});
})

app.use((req, res) => {
  res.status(404).render('404');
});

app.listen(PORT,()=>{
    console.log("Se inicio el servidor en el puerto: "+ PORT)
});