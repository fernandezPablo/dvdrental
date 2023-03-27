const { datos } = require('../data/datos');

class BaseModel {

    constructor() {
        this.selectquery = '';
        this.insertquery = '';
        this.updatequery = '';
        this.deletequery = '';
        this.cliente = null;

    }
    
    //*INSERT AND UPDATE
    beforeStartTransaction() { }
    beforeExecSql() { }
    afterExecSql() { }
    afterCommitTransaction() { }

    //*SELECT
    beforeConsultar(){}
    afterConsultar(rows){
        //*Este método esta destinado a realizar transformaciones sobre las filas devueltas.
        return rows;
    }

    consultar(){
        return new Promise(async (resolve, reject) => {
            this.cliente = await datos.getCliente();
            try {
                this.beforeConsultar();
                const rows = (await this.cliente.query(this.selectquery)).rows;
                const transformedRows = this.afterConsultar(rows);
                resolve(transformedRows);
            } catch (error) {
                console.log('Error al consultar: ', error);
                reject(error);
            }
            finally{
                this.cliente.release();
            }
        });
    }


    guardar(operacion, params) {
        return new Promise(async (resolve, reject) => {
            this.beforeStartTransaction();
            this.cliente = await datos.getCliente();
            try {
                this.cliente.query('BEGIN;');
                this.beforeExecSql();
                switch (operacion) {
                    case 'I':
                        await this.cliente.query(this.insertquery, params);
                        break;
                    case 'M':
                        await this.cliente.query(this.updatequery, params);
                        break;
                    default:
                        throw new Exception('Operación no definida');
                }
                this.afterExecSql();
                this.cliente.query('COMMIT;');
                this.afterCommitTransaction();
                resolve(true);
            } catch (error) {
                console.log('Error BaseModel: ', error);
                this.cliente.query('ROLLBACK;');
                reject(false);
            }
        });
    }

    cerrarConsulta() {
        if (this.cliente !== null) {
            this.cliente.release();
            this.cliente = null;
        }
    }
}

module.exports = { BaseModel }