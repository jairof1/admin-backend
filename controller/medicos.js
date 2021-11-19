/*jshint esversion: 9 */
/* jshint -W033 */
const { response } = require('express');

const Medico = require('../models/medicos');


const getMedico = async(req, res = response) => {

    const medicos = await Medico.find()
        .populate('usuario', 'nombre')
        .populate('hospital', 'nombre');
    res.json({
        ok: true,
        medicos
    });
}


const crearMedico = async(req, res = response) => {

    const uid = req.uid;
    const medico = new Medico({ usuario: uid, ...req.body });

    //console.log(uid);

    try {
        const medicoDB = await medico.save();

        res.json({
            ok: true,
            medico: medicoDB
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'hable con el administrador'
        });
    }
}

const actualizarMedico = async(req, res = response) => {


    const id= req.params.id;
const uid= req.uid;
    try {

        const medicos = await Medico.findById(id);
        
        if(!medicos){
            return res.status(404).json({
                ok:true,
                msg: 'Medico no encontrado por id'
            });
        }

        const cambiosMedicos ={
            ...req.body,
            usuario:uid
        }

        const medicoActualizado = await Medico.findByIdAndUpdate(id,cambiosMedicos,{new:true});
        
        res.json({
            ok: true,
            msg: 'actualizarMedico',
            medico:medicoActualizado
        });
    } catch (error) {
        console.log(error);

        res.status(500).json({
            ok: false,
            msg:'hable con el administrador'
        });
    }

    
}

const borrarMedico = async(req, res = response) => {
    const id= req.params.id;

    try {

        const medicos = await Medico.findById(id);
        
        if(!medicos){
            return res.status(404).json({
                ok:true,
                msg: 'Medico no encontrado por id'
            });
        }

        await Medico.findByIdAndDelete(id);

        
        res.json({
            ok: true,
            msg: 'Medico eliminado'
           
        });
    } catch (error) {
        console.log(error);

        res.status(500).json({
            ok: false,
            msg:'hable con el administrador'
        });
    }
}

module.exports = {
    getMedico,
    crearMedico,
    actualizarMedico,
    borrarMedico
}