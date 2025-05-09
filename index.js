const express = require('express');
const app = express();
const pug = require('pug');

const PORT = 3000;

app.set('view engine', 'pug');
app.set('views', './vistas')

app.get('/', (req, res) =>{

    res.render('index')

});

app.listen(PORT,()=>{
    console.log("Se inicio el servidor en el puerto: "+ PORT)
});