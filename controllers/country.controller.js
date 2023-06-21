const { request, response} = require('express');
const {Country} = require('../modelos/country.modelo');

const listarCountries = async (req = request, res = response) => {
    const country = new Country();
    try {
        console.log('Usuario logueado: ', req.usuario);
        const rows = await country.consultar();
        res.status(200).json({
            rows
        });
    } catch (error) {
        console.log('Error al listar paises', error);
        res.status(500).json({
            msg: 'Error interno al consultar paises.'
        });        
    }
}

const guardarCountry = async (req = request, res = response) => {
    const { country_id, country } = req.body;
    const countryObj = new Country();
    countryObj.country_id = country_id;
    countryObj.country = country;
    try {
        await countryObj.guardar('I', [countryObj.country]);
        res.status(201).json({
            msg: 'Alta pasís ok'
        });
    } catch (error) {
        console.log('Error al dar de alta pais', error);
        res.status(500).json({
            msg: 'Error interno al guardar paises.'
        });        
    }    
}

const existePais = async (req = request, res = response) => {
    const country = new Country();
    
    const { pais } = req.query;

    try {
        const resp = await country.existePais(pais);
        if(resp)
        res.status(200).json({
            result: true,
            msg: 'El país ya existe.'
        });
        else
        res.status(200).json({
            result: false,
            msg: 'El país no existe.'
        });      
    } catch (error) {
        console.log('Error al consultar existencia del pais: ', error);
        res.status(500).json({
            msg: 'Error al consultar existencia del país'
        });
    }
        
}

module.exports = { listarCountries, guardarCountry, existePais }