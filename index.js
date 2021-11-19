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

//Directorio publico
app.use( express.static('public') );

//rutas
app.use('/api/usuarios', require('./routes/usuario'));
app.use('/api/login', require('./routes/auth'));
app.use('/api/hospitales', require('./routes/hospitales'));
app.use('/api/medico', require('./routes/medicos'));
app.use('/api/todo', require('./routes/busquedas'));
app.use('/api/uploads', require('./routes/uploads'));

app.listen(process.env.PORT, () => {
    console.log("servidor conrriendo " + process.env.PORT);
});