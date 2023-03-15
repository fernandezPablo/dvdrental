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

    modificar(sqltext = '', values = []){
        return datos.ejecutarConsulta(sqltext, values);
    }

    borrar(sqltext = '', values = []){
        return datos.ejecutarConsulta(sqltext, values);
    }

    cerrarConsulta(){
        datos.cerrarConsulta();
    }


}

module.exports = {
    Persistencia
};