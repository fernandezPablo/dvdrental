const { datos } = require('../data/datos');

class Persistencia{

    constructor(){

    }

    listar(sqltext = '', values = []){
        return datos.ejecutarConsulta(sqltext, values);
    }
    
    obtenerUno(sqltext = '', values = []){
        return datos.ejecutarConsulta(sqltext, values);
    }

    guardar(sqltext = '', values = []){
        return datos.ejecutarConsulta(sqltext, values);
    }

}

module.exports = {
    Persistencia
};