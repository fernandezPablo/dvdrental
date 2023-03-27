const {BaseModel} = require('./base-model.modelo');

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
                country_id,
                country)
            VALUES (
                $1,
                $2);
        `;
    }
}

module.exports = { Country }