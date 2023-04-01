const {BaseModel} = require('./base-model.modelo');

class Category extends BaseModel{

    constructor(){
        super();
        this.category_id = null;
        this.name = null;
        this.last_update = null;
        this.selectquery = `
            SELECT 
                category_id,
                name,
                last_update
            FROM category;`;

        this.insertquery = `
            INSERT INTO category(
                category_id,
                name)
            VALUES (
                $1,
                $2);
        `;
    }
}

module.exports = { Category }