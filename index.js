const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv').config();
const { dbConnection } = require('./database/config');
//crea el servidor de express
const app = express();


//configure cors
app.use(cors());

//Lectura y parseo del body
app.use(express.json());

//Base de datos
dbConnection();


//rutas
app.use('/api/usuarios', require('./routes/usuario'));
app.use('/api/login', require('./routes/auth'));


app.listen(process.env.PORT, () => {
    console.log("servidor conrriendo " + process.env.PORT);
});