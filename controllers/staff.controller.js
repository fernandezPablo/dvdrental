const { request, response} = require('express');
const Staff = require('../modelos/staff.modelo');

const getStaff = async (req = request, res = response) =>{
    console.log('STAFF GET');
    const staff = new Staff();

    const id = req.query.staff_id;

    try {
        if (!id){
            const respuesta = await staff.listar();
            staff.cerrarConsulta();
            // console.log('Respuesta: ', respuesta);
            // res.cookie('testcookie','testing');
            res.status(200).json(
                respuesta.rows
            );    
        }
        else{
            const respuesta = await staff.obtenerUno({id});
            staff.cerrarConsulta();
            // res.cookie('testcookie','testing');
            res.status(200).json(
                respuesta.rows[0]
            );           
        }
    } catch (error) {
        res.status(500).json({
            msg: `Error al listar staffs ${error}`
        });    
    }
};

const postStaff =  async (req = request, res = response) => {
    console.log('STAFF POST');

    const { staff_id,
            first_name,
            last_name,
            address_id,
            email,
            store_id,
            active,
            username,
            password } = req.body;

    const staff = new Staff(
        staff_id,
        first_name,
        last_name,
        address_id,
        email,
        store_id,
        active,
        username,
        password
    );
    
    try {
        await staff.guardar();
        staff.cerrarConsulta();
        res.status(201).json({
            msg: 'Staff creado correctamente'
        });    
        
    } catch (error) {
        res.status(500).json({
            msg: `Error al crear staff: ${error}`
        });                
    }
};

const putStaff = async (req = request, res = response) => {
    console.log('PUT STAFF');

    const { id } = req.params;
    const { staff_id,
            first_name,
            last_name,
            address_id,
            email,
            store_id,
            active,
            username,
            password } = req.body;
    
    const staff = new Staff(
        staff_id,
        first_name,
        last_name,
        address_id,
        email,
        store_id,
        active,
        username,
        password );
    try {
        await staff.modificar();
        staff.cerrarConsulta();
        res.status(200).json({
            msg: 'Staff modificado correctamente...'
        });
    } catch (error) {
        res.status(500).json({
            msg: `Error al intentar modificar el Staff. Error: ${error}`
        });
    }
}

const deleteStaff =  async (req = request, res = response) =>{
    console.log('STAFF DELETE');
    const { id } = req.params;

    const staff = new Staff();
    try {
        await staff.borrar(id); 
        staff.cerrarConsulta();
        res.status(200).json({
            msg: 'Staff eliminado correctamente...'
        });    
    } catch (error) {
        res.status(500).json({
            msg: `Error al intentar eliminar el staff. Error: ${error}`
        });    
    }
};

module.exports = {
    getStaff,  
    postStaff,    
    deleteStaff,
    putStaff    
}