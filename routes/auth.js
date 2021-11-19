/*
Path: '/api/login'
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { login,googleSingIn,renewToken } = require('../controller/auth');
const { validarCampos } = require('../middleware/validar-campos');
const { validarJWT } = require('../middleware/validar-jwt');
const { generarJWT } = require('../helper/jwt');

const router = Router();

router.post('/', [
    check('email', 'email es obligatorio').isEmail(),
    check('password', 'el password es obligatorio').not().isEmpty(),
    validarCampos
], login);

router.post('/google', [
    check('token', 'el token de google es obligatorio').not().isEmail(),
    validarCampos
], googleSingIn);

router.get('/renew',
validarJWT,renewToken );


module.exports = router;