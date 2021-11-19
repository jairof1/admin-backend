/*
Hospitales
ruta: /api/hospitales
*/

/*jshint esversion: 6 */

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middleware/validar-campos');
const { validarJWT } = require('../middleware/validar-jwt');
const router = Router();

const { getHospital, crearHospital, actualizarHospital, borrarHospital } = require('../controller/hospital');

router.get('/', getHospital);

router.post('/', validarJWT, [

    check('nombre', 'El nombre del hospital es necesario').not().isEmpty(),
    validarCampos
], crearHospital);

router.put('/:id',[
    validarJWT,
    check('nombre', 'El nombre del hospital es necesario').not().isEmpty()
], actualizarHospital);

router.delete('/:id',validarJWT, borrarHospital);


module.exports = router;