/*jshint esversion: 9 */
/* jshint -W033 */
/*
ruta: api/todo/:busqueda
*/
const { Router } = require('express');
const { getTodo, getDocumentoColeccion } = require('../controller/busquedas');
const { validarJWT } = require('../middleware/validar-jwt');
const router = Router();


router.get('/:busqueda', validarJWT, getTodo);

router.get('/coleccion/:tabla/:busqueda', validarJWT, getDocumentoColeccion);


module.exports = router;