/*
Hospitales
ruta: /api/medico
*/

/*jshint esversion: 6 */

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middleware/validar-campos');
const { validarJWT } = require('../middleware/validar-jwt');
const router = Router();

const { getMedico, crearMedico, actualizarMedico, borrarMedico } = require('../controller/medicos');

router.get('/', getMedico);

router.post('/', validarJWT, [
    check('nombre', 'El nombre del hospital es necesario').not().isEmpty(),
    check('hospital', 'El hospital id debe ser valido').isMongoId(),
    validarCampos
], crearMedico);

router.put('/:id', [
    validarJWT,
    check('nombre', 'El nombre del hospital es necesario').not().isEmpty()
], actualizarMedico);

router.delete('/:id',validarJWT, borrarMedico);


module.exports = router;