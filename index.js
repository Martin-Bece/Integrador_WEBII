const express = require('express');
const app = express();
const pug = require('pug');

const PORT = 3000;

app.set('view engine', 'pug');
app.set('views', './vistas');


app.get('/', (req, res) =>{
    res.render('PaginaInicio')
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

app.use((req, res) => {
  res.status(404).render('404');
});

app.listen(PORT,()=>{
    console.log("Se inicio el servidor en el puerto: "+ PORT)
});