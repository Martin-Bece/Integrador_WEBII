const express = require('express');
const app = express();
const pug = require('pug');

const PORT = 3000;

app.set('view engine', 'pug');
app.set('views', './vistas');
app.use('/imgs', express.static(__dirname + '/imgs'));


app.get('/', (req, res) =>{
    res.render('index')
});

app.get('/BuscarPaciente', (req, res) =>{
    res.render('BuscarPaciente')
})

app.use((req, res) => {
  res.status(404).render('404');
});

app.listen(PORT,()=>{
    console.log("Se inicio el servidor en el puerto: "+ PORT)
});