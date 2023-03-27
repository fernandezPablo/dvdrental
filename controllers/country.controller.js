const { request, response} = require('express');
const {Country} = require('../modelos/country.modelo');

const listarCountries = async (req = request, res = response) => {
    const country = new Country();
    try {
        const rows = await country.consultar();
        console.log('Paises: ', rows);
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
        await countryObj.guardar('I', [countryObj.country_id, countryObj.country]);
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

module.exports = { listarCountries, guardarCountry }