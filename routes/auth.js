/*
Path: '/api/login'
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { login } = require('../controller/auth');
const { validarCampos } = require('../middleware/validar-campos');

const router = Router();

router.post('/', [
    check('email', 'email es obligatorio').isEmail(),
    check('password', 'el password es obligatorio').not().isEmpty(),
    validarCampos
], login);




module.exports = router;