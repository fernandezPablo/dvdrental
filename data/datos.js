const { Pool, Client } = require('pg');

class Datos{

    constructor(){
        this.pool = new Pool({
            host: process.env.HOST_DB,
            user: process.env.USER_DB,
            password: process.env.PASS_DB,
            database: process.env.NAME_DB
        });       
    }

    async getCliente(){
        return await this.pool.connect();
    }

    async ejecutarConsulta(sqltext = '', values = []){
        console.log('EJECUTARCONSULTA');
        return (await this.getCliente()).query(sqltext, values);
    }

}

const datos = new Datos();

module.exports = {
    datos
}