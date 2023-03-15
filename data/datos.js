const { Pool, Client } = require('pg');

class Datos{

    constructor(){
        this.pool = new Pool({
            host: process.env.HOST_DB,
            user: process.env.USER_DB,
            password: process.env.PASS_DB,
            database: process.env.NAME_DB,
            application_name: 'dvdrental-node'
        });
        this.cliente = this.getCliente();       
    }

    async getCliente(){            
        this.cliente = await this.pool.connect(); 
        return this.cliente;
    }

    async ejecutarConsulta(sqltext = '', values = []){
        console.log('EJECUTARCONSULTA');
        return (await this.getCliente()).query(sqltext, values);
    }

    cerrarConsulta(){
        this.cliente.release();
        this.cliente = undefined;
    }

}

const datos = new Datos();

module.exports = {
    datos
}