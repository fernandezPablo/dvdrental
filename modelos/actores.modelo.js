const { pg, Pool } = require('pg');
const { Persistencia } = require('./persistencia.modelo');
const { datos } = require('../data/datos');

class Actor extends Persistencia{ 

    constructor(
        actor_id,
        first_name,
        last_name,
        last_update
    ){
        super();
        this.actor_id = actor_id;
        this.first_name = first_name;
        this.last_name = last_name;
        this.last_update = last_update;

        //quitar luego de cambiar en los demás verbos
        this.pool = new Pool({
            host: 'localhost',
            user: 'postgres',
            password: '102569',
            database: 'dvdrental'
        });
    }

    async listar(){
        return super.listar(`
            SELECT 
                actor_id,
                first_name,
                last_name,
                last_update
            FROM actor;  
        `, []);
    }

    async guardar(){
        return super.guardar(`
            INSERT INTO actor(
                actor_id,
                first_name,
                last_name,
                last_update)
            VALUES (
                $1,
                $2,
                $3,
                $4);                
        `,
        [
            this.actor_id,
            this.first_name,
            this.last_name,
            this.last_update
        ]
        );
        // return this.pool.query(`
        //     INSERT INTO actor(
        //         actor_id,
        //         first_name,
        //         last_name,
        //         last_update)
        //     VALUES (
        //         $1,
        //         $2,
        //         $3,
        //         $4);
        // `,
        // [
        //     this.actor_id,
        //     this.first_name,
        //     this.last_name,
        //     this.last_update
        // ]);

    }

    async modificar(){
        return this.pool.query(`
            UPDATE 
                actor
            SET 
                first_name=$2,
                last_name=$3,
                last_update=$4
            WHERE 
                actor_id=$1;            
        `,
        [
            this.actor_id,
            this.first_name,
            this.last_name,
            this.last_update
        ]);
    }

    async borrar(id){
        return this.pool.query(`
            DELETE FROM 
                actor
            WHERE
                actor_id = $1;
        `,
        [id] 
        );
    }
}

module.exports = Actor;