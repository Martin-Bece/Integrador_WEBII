const express = require('express');
const app = express();
const pug = require('pug');

const PORT = 3000;

app.get('/', (req, res) =>{

    res.send('Hello World!!')

});

app.listen(PORT,()=>{
    console.log("Se inicio el servidor en el puerto: "+ PORT)
});