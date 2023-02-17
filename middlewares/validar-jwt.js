const { request, response } = require('express');
const jwt = require('jsonwebtoken');

const validarJWT = (req = request, res = response, next) => {

    const { token } = req.headers;

    if (!token){
        return res.status(401).json({
            msg: 'Falta el token!!!'
        });
    }
    
    try {
        // const resultado = jwt.verify(token, process.env.PRIPRIVATEKEY);
        const resultado = jwt.verify(token, 'N1e!S"ZQycSyVqK');
        
        console.log('VALIDEZ DEL TOKEN: ', resultado);
        
        next();
    } catch (error) {        
        console.log('Error al verificar el token: ', error);
        return res.status(401).json({
            msg: 'Error al verificar el token!!!'
        });
    }    
}

module.exports = {validarJWT};