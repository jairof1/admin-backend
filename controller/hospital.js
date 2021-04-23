/*jshint esversion: 9 */
/* jshint -W033 */
const { response } = require('express');
const { uid } = require('../middleware/validar-jwt');

const Hospital = require('../models/hospital');

const getHospital = async(req, res = response) => {

    const hospitales = await Hospital.find().populate('usuario', 'nombre');
    res.json({
        ok: true,
        hospitales
    });
}

const crearHospital = async(req, res = response) => {

    const uid = req.uid;
    const hospital = new Hospital({ usuario: uid, ...req.body });

    console.log(uid);

    try {
        const hospitalDB = await hospital.save();

        res.json({
            ok: true,
            hospital: hospitalDB
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'hable con el administrador'
        });
    }
}

const actualizarHospital = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'actualizarHospital'
    });
}

const borrarHospital = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'borrarHospital'
    });
}

module.exports = {
    getHospital,
    crearHospital,
    actualizarHospital,
    borrarHospital
}