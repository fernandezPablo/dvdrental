const { response } = require("express");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { generateJWT, generateRefreshJWT, validarRefreshToken } = require('../helpers/generar-jwt.helper');
const Staff = require("../modelos/staff.modelo");

const login = async (req, res =  response) => {
    
    try {
        const { correo, password } = req.body;

        //Verificar si el usuario existe
        const staff = new Staff();
        const { rows } = await staff.obtenerUno({correo});
        if(rows.length === 0)
        {
            return res.status(400).json({
                msg: 'El usuario no existe!'
            });   
        }
        
        //Verificar el estado del usuario
        if(!rows[0].active){
            return res.status(400).json({
                msg: 'El usuario no esta activo!'
            });   
        }
        
        //Verificar la contraseña
        const result = await bcrypt.compare(password, rows[0].password);
        if (!result){
            return res.status(400).json({
                msg: 'Contraseña incorrecta!'
            });   
        }

        //Generar JWT
        const token = await generateJWT({ uid: rows[0].email});
        const refreshToken = await generateRefreshJWT({ uid: rows[0].email});

        //* Envió los datos de autenticación al cliente a traves de cookies
        //* en lugar de usar el Localstorage. Las cookies me permiten establecer
        //* opciones de seguridad como httpOnly que ayudan a evitar ataques de XSS
        //* o maxAge que establece una fecha de expiración de las cookies.
        res.cookie('ssid',token, {
            httpOnly: true,
            maxAge: 1000 * 60 
        });
        res.cookie('ssid_refresh',refreshToken, {
            httpOnly: true,
            maxAge: 1000 * 60
        });
        // res.setHeader('Access-Control-Allow-Origin','localhost:4200');
        // res.setHeader('Access-Control-Allow-Credentials', 'true');
        res.status(200).json({
            msg: 'Login OK!',
            // token,
            // refreshToken
        });
        
    } catch (error) {
        res.status(500).json({
            msg: 'Error interno: ' + error
        });   
    }
}

const refreshToken = async (req = request, res = response) => {
    const { correo } = req.body;
    try {
        //Generar JWT
        const token = await generateJWT({ uid: correo});
        const refreshToken = await generateRefreshJWT({ uid: correo});

        res.status(200).json({
            msg: 'Login OK!',
            token,
            refreshToken
        });         

    } catch (error) {
        console.log('ERROR REFRESCO: ', error);
        res.status(500).json({
            msg: 'Error al procesar token de refresco.'
        });
    }

}

module.exports = {
    login,
    refreshToken
}