const { request, response } = require('express');
const jwt = require('jsonwebtoken');
const { TokenExpiredError } = require('jsonwebtoken');

const validarJWT = (req = request, res = response, next) => {
    const { token } = req.headers;
    // console.log('Validando token...', req.headers);
    if (!token){
        return res.status(401).json({
            msg: 'Para acceder a este recurso necesita autorización'
        });
    }
    try {
        const resultado = jwt.verify(token, process.env.PRIVATEKEY);
        console.log('VALIDEZ DEL TOKEN: ', resultado);
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