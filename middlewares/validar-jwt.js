const { request, response } = require('express');
const { Pool } = require('pg');
const jwt = require('jsonwebtoken');
const { TokenExpiredError } = require('jsonwebtoken');


const validarJWT = async (req = request, res = response, next) => {
    // const { token } = req.headers;
    const  token  = req.cookies['ssid'];
    // console.log('Cookies: ', cookies['ssid']);
    // console.log('Validando token...', req.headers);
    if (!token){
        return res.status(401).json({
            msg: 'Para acceder a este recurso necesita autorización'
        });
    }
    try {
        const resultado = jwt.verify(token, process.env.PRIVATEKEY);
        console.log('VALIDEZ DEL TOKEN: ', resultado);
        const pool = new Pool({
            host: process.env.HOST_DB,
            user: process.env.USER_DB,
            password: process.env.PASS_DB,
            database: process.env.NAME_DB,
            application_name: 'dvdrental-node'    
        });
        const resp = await pool.query(`
            SELECT 
                staff_id,
                first_name,
                last_name,
                address_id,
                email,
                store_id,
                active,
                username
            FROM staff
            WHERE
                email = $1;
        `,[
            resultado.uid
        ]);
        console.log('Usuario: ', resp.rows[0]);
        req.usuario = resp.rows[0];
        next();
    } catch (error) {
        if (error instanceof TokenExpiredError) {
            return res.status(401).json({
                msg: 'Token expirado. Use el token de refresco o vuevla a loguearse.'
            });
        }       
        console.log('Error al verificar el token: ', error);
        return res.status(401).json({
            msg: 'Error al verificar el token!!!'
        });
    }    
}

const validarRefreshJWT = (req = request, res = response, next) => {
    const { refreshtoken } = req.body;

    if (!refreshtoken){
        return res.status(400).json({
            msg: 'No se especifico el token de refresco'
        });
    }

    jwt.verify(refreshtoken, process.env.PRIVATEREFRESHKEY, (error, payload) => {
        if(error){
            return res.status(401).json({
                msg: 'El token de refresco suministrado no es valido. No esta autorizado a realizar esta acción.'
            });
        }
        req.body.correo = payload.correo;
        next();
    });    
}

module.exports = {
    validarJWT,
    validarRefreshJWT
};