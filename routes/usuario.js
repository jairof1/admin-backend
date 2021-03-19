const { Router } = require('express');
const { check } = require('express-validator');

const { getUsuario, crearUsuario, actualizarUsuario, borrarUsuarios } = require('../controller/usuario');
const { validarCampos } = require('../middleware/validar-campos');
const { validarJWT } = require('../middleware/validar-jwt');
const router = Router();

router.get('/', validarJWT, getUsuario);
router.post('/', [
    check('nombre', 'el nombre es obligatorio').not().isEmpty(),
    check('password', 'el password es obligatorio').not().isEmpty(),
    check('email', 'el email es obligatorio').isEmail(),
    validarCampos
], crearUsuario);
router.put('/:id', validarJWT, [
    check('nombre', 'el nombre es obligatorio').not().isEmpty(),
    check('role', 'el role es obligatorio').not().isEmpty(),
    check('email', 'el email es obligatorio').isEmail(),
    validarCampos
], actualizarUsuario);
router.delete('/:id', validarJWT, borrarUsuarios);


module.exports = router;