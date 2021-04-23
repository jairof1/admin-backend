/*jshint esversion: 9 */
/* jshint -W033 */
/*
ruta: api/uploads/
*/
const { Router } = require('express');
const { fileUpload, retornaImagen } = require('../controller/uploads');
const { validarJWT } = require('../middleware/validar-jwt');
const expressfileUpload = require('express-fileupload');

const router = Router();

router.use(expressfileUpload());

router.put('/:tipo/:id', validarJWT, fileUpload);
router.get('/:tipo/:foto', retornaImagen);



module.exports = router;