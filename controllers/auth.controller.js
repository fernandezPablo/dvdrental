const { response } = require("express");
const Staff = require("../modelos/staff.modelo");

const login = (req, res =  response) => {
    
    try {

        //Verificar si el usuario existe
        const staff = new Staff();
        // staff.obtenerUno();

        //Verificar el estado del usuario


        //Verificar la contraseña


        //Generar JWT

        res.status(200).json({
            msg: 'Login OK!'
        });   
    } catch (error) {
        res.status(500).json({
            msg: 'Error interno: ' + error
        });   
    }
}

module.exports = {
    login
}