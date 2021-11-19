/*jshint esversion: 9 */
/* jshint -W033 */

const { response, json } = require('express');
const usuario = require('../models/usuario');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helper/jwt');
const { googleVerify } = require('../helper/google-verify');

const login = async(req, res = response) => {

    const { email, password } = req.body;

    try {
        //verifica email
        const usuarioDB = await usuario.findOne({ email });

        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'Email no valida'
            });
        }


        const validPassword = bcrypt.compareSync(password, usuarioDB.password);
        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Contraseña no valida'
            });
        }

        //generar el token - jwt
        const token = await generarJWT(usuarioDB.id);

        res.json({
            ok: true,
            token
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}

const googleSingIn  = async(req,res = response)=>{

    const googleToken = req.body.token;

try {

    const {name,email,picture} = await googleVerify(googleToken);

    const usuarioDB = await usuario.findOne({email});
    console.log(usuarioDB);
    let usuariobean;
    
    if(!usuarioDB){
        usuariobean= new Usuario({
            nombre: name,
            email,
            password:'@@@',
            img: picture,
            google:true
        });
    }else{
        usuariobean= usuarioDB;
        usuariobean.google=true;
    }

    //guardamos en la base de datos
    await usuariobean.save();
    console.log('object');
    //generar el token - jwt
    const token = await generarJWT(usuariobean.id);
    console.log(token);
    res.json({
        ok:true,
        token
});
} catch (error) {
    res.status(401).json({
        ok:false,
        msg: 'El token no es correcto'
});
}

    
}

const renewToken = async(req, res)=>{

    const uid= req.uid;

    //generar el token - jwt
    const token = await generarJWT(uid);

    res.json({
        ok:true,
        token
    });
}

module.exports = {
    login,
    googleSingIn,
    renewToken
}