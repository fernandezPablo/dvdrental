const { request, response} = require('express');
const {Category} = require('../modelos/categories.modelo');

const listarCategorias  = async (req = request, res = response) => {
    const category = new Category();
    try {
        const rows = await category.consultar();
        console.log('Categorias: ', rows);
        res.status(200).json({
            rows
        });
    } catch (error) {
        console.log('Error al listar categorias', error);
        res.status(500).json({
            msg: 'Error interno al consultar categorias.'
        });        
    }
}

const guardarCategoria = async (req = request, res = response) => {
    const { category_id, name } = req.body;
    const category = new Category();
    category.category_id = category_id;
    category.name = name;
    try {
        await category.guardar('I', [category.category_id, category.name]);
        res.status(201).json({
            msg: 'Alta categoría ok'
        });
    } catch (error) {
        console.log('Error al dar de alta categoria', error);
        res.status(500).json({
            msg: 'Error interno al guardar categoria.'
        });        
    }    
}

module.exports = { listarCategorias, guardarCategoria }