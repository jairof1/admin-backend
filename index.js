const express = require('express');
const dotenv = require('dotenv').config();
const { dbConnection } = require('./database/config');
//crea el servidor de express
const app = express();
//Base de datos
dbConnection();

console.log(process.env.DB_CNN);

//rutas
app.get('/', (req, res) => {
    res.json({
        ok: true,
        msg: 'hola mundo'
    });
});


app.listen(process.env.PORT, () => {
    console.log("servidor conrriendo " + process.env.PORT);
});