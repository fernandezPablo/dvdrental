const jwt = require('jsonwebtoken');

const generateJWT = (payload) => {
    return new Promise( (resolve, reject) => {
        try {
            const token = jwt.sign(payload, process.env.PRIVATEKEY,{
                expiresIn: '2h'
            });     
            resolve(token);
        } catch (error) {
            console.log('Error al generar token', error);
            reject('Error al generar token: ', error);
        }
    });
}

const generateRefreshJWT = (payload) => {
    return new Promise( (resolve, reject) => {
        try {
            const resfreshtoken = jwt.sign(payload, process.env.PRIVATEREFRESHKEY,{
                expiresIn: '1y'
            });     
            resolve(resfreshtoken);
        } catch (error) {
            console.log('Error al generar token', error);
            reject('Error al generar token: ', error);
        }
    });    
}


module.exports = {
    generateJWT,
    generateRefreshJWT 
}