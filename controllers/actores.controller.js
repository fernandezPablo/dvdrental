const { request, response} = require('express');
const Actor = require('../modelos/actores.modelo');

const getActores = async (req = request, res = response) =>{
    console.log('ACTORES GET');

    const actor = new Actor();

    try {
        const respuesta = await actor.listar();
        console.log('Respuesta: ', respuesta);
        res.status(200).json({
            msg: 'ACTORES GET',
            response: respuesta.rows
        });    
    } catch (error) {
        res.status(500).json({
            msg: `Error al listar actores ${error}`
        });    
    }

};

const postActores =  async (req = request, res = response) =>{
    console.log('ACTORES POST');

    const { actor_id, first_name, last_name, last_update } = req.body;

    const actor = new Actor(
        actor_id, 
        first_name, 
        last_name, 
        last_update
    );
    
    try {
        await actor.guardar();
        res.status(201).json({
            msg: 'Actor creado correctamente'
        });    
        
    } catch (error) {
        res.status(500).json({
            msg: `Error al crear actor: ${error}`
        });                
    }
};

const putActores = async (req = request, res = response) => {
    console.log('PUT ACTORES');

    const { id } = req.params;
    const { first_name, last_name, last_update } = req.body;
    
    const actor = new Actor(id, first_name, last_name, last_update);
    try {
        await actor.modificar();
        res.status(200).json({
            msg: 'Actor modificado correctamente...'
        });
    } catch (error) {
        res.status(500).json({
            msg: `Error al intentar modificar el actor. Error: ${error}`
        });
    }
}

const deleteActores =  async (req = request, res = response) =>{
    console.log('ACTORES DELETE');
    const { id } = req.params;

    const actor = new Actor(id, first_name, last_name, last_update);
    try {
        await actor.borrar(id); 
        res.status(200).json({
            msg: 'Actor eliminado correctamente...'
        });    
    } catch (error) {
        res.status(500).json({
            msg: `Error al intentar eliminar el actor. Error: ${error}`
        });    
    }
};

module.exports = {
    getActores,    
    postActores,    
    deleteActores,
    putActores    
}