const {BaseModel} = require('./base-model.modelo');
const { datos } = require('../data/datos');

class Country extends BaseModel{

    constructor(){
        super();
        this.country_id = null;
        this.country = null;
        this.last_update = null;
        this.selectquery = `
            SELECT 
                country_id, 
                country, 
                last_update
            FROM country;
        `;

        this.insertquery = `
            INSERT INTO country(
                country)
            VALUES (
                $1);
        `;
    }

    existePais(pais){
        if(!pais) return Promise.reject('Debe indicar el país a consultar');

        return new Promise( async (resolve, reject) => {
            const cliente = await datos.getCliente();

            try {
                const resp = await cliente.query(`
                SELECT 
                    1
                FROM country
                WHERE
                    UPPER(country) = UPPER($1);
                `,
                [
                    pais
                ]);
                resolve(resp.rows.length > 0);
            } catch (error) {
                reject(error);
            }
            finally{
                cliente.release();
            }
        });
    }
}

module.exports = { Country }