/*jshint esversion: 9 */
/* jshint -W033 */
const { response } = require('express');
const Usuario = require('../models/usuario');
const Medico = require('../models/medicos');
const Hospital = require('../models/hospital');

const getTodo = async(req, res) => {

    const busqueda = req.params.busqueda;
    const regex = new RegExp(busqueda, 'i');


    const [usuario, medico, hospital] = await Promise.all([
        Usuario.find({ nombre: regex }),
        Medico.find({ nombre: regex }),
        Hospital.find({ nombre: regex }),
    ])

    res.json({
        ok: true,
        usuario,
        medico,
        hospital
    })
}


const getDocumentoColeccion = async(req, res) => {

    const tabla = req.params.tabla;
    const busqueda = req.params.busqueda;
    const regex = new RegExp(busqueda, 'i');

    let data = [];

    switch (tabla) {
        case 'medicos':
            data = await Medico.find({ nombre: regex })
                .populate('usuario', 'nombre img')
                .populate('hospital', 'nombre img');
            break;

        case 'hospitales':
            data = await Hospital.find({ nombre: regex })
                .populate('usuario', 'nombre img');
            break;

        case 'usuarios':
            data = await Usuario.find({ nombre: regex });
            break;

        default:
            res.status(400).json({
                ok: false,
                msg: 'la tabla tiene que ser usuarios/medicos/hospitales'
            });


    }

    res.json({
        ok: true,
        resultados: data
    });


}

module.exports = {
    getTodo,
    getDocumentoColeccion
}