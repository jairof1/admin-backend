/*jshint esversion: 9 */
/* jshint -W033 */
const Medico = require('../models/medicos');
const Hospital = require('../models/hospital');
const Usuario = require('../models/usuario');
const fs = require('fs');

const actualizarImagen = async(tipo, id, nombreArchivo) => {
    console.log('tipo ' + tipo);
    let pathViejo = '';
    switch (tipo) {
        case 'medicos':
            const medico = await Medico.findById(id);
            if (!medico) {
                console.log('No es un medico por id');
                return;
            }

            pathViejo = `./uploads/medicos/${medico.img}`;

            if (fs.existsSync(pathViejo)) {
                //borra la imagen anterior
                fs.unlinkSync(pathViejo);
            }

            medico.img = nombreArchivo;
            await medico.save();


            break;

        case 'hospitales':
            const hospital = await Hospital.findById(id);
            if (!hospital) {
                console.log('No es un hospital por id');
                return;
            }

            pathViejo = `./uploads/hospitales/${hospital.img}`;

            if (fs.existsSync(pathViejo)) {
                //borra la imagen anterior
                fs.unlinkSync(pathViejo);
            }

            hospital.img = nombreArchivo;
            await hospital.save();


            break;
        case 'usuarios':
            const usuario = await Usuario.findById(id);
            if (!usuario) {
                console.log('No es un usuario por id');
                return;
            }

            pathViejo = `./uploads/usuarios/${usuario.img}`;

            if (fs.existsSync(pathViejo)) {
                //borra la imagen anterior
                fs.unlinkSync(pathViejo);
            }

            usuario.img = nombreArchivo;
            await usuario.save();


            break;

        default:
            break;
    }
}

module.exports = {
    actualizarImagen
}