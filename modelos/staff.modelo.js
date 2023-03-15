const { Pool } = require('pg');
const bcrypt = require('bcrypt');

const { Persistencia } = require('./persistencia.modelo');

class Staff extends Persistencia{ 

    constructor(
        staff_id,
        first_name,
        last_name,
        address_id,
        email,
        store_id,
        active,
        username,
        password,
        last_update
    ){
        super();
        this.staff_id = staff_id;
        this.first_name = first_name;
        this.last_name = last_name;
        this.address_id = address_id;
        this.email = email;
        this.store_id = store_id;
        this.active = active;
        this.username = username;
        this.password = password;
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
                staff_id
                ,first_name
                ,last_name
                ,address_id
                ,email
                ,store_id,
                active
                ,username
                ,password
                ,last_update
            FROM staff;
        `, []);
    }

    async obtenerUno({correo, id}){
        //* Se puede consultar los staff por id o por correo de acuerdo
        //* a lo que se defina en el objeto pasado como parámetro
        return super.obtenerUno(`
            SELECT 
                staff_id
                ,first_name
                ,last_name
                ,address_id
                ,email
                ,store_id,
                active
                ,username
                ,password
                ,last_update
            FROM staff
            WHERE
                ${(id)?'staff_id':'email'}=$1
        `, (id)?[id]:[correo]);        
        
    }

    async guardar(){
        const saltRounds = 5;
        const salt = await bcrypt.genSalt(saltRounds);
        console.log('Salt: ', salt);
        const hashedPass = await bcrypt.hash(this.password, salt);
        console.log('Hashed Pass: ', hashedPass);

        return super.guardar(`
        INSERT INTO staff(
            first_name
           ,last_name
           ,address_id
           ,email
           ,store_id
           ,active
           ,username
           ,password)
       VALUES (
            $1
           ,$2
           ,$3
           ,$4
           ,$5
           ,$6
           ,$7
           ,$8);              
        `,
        [
            this.first_name,
            this.last_name,
            this.address_id,
            this.email,
            this.store_id,
            this.active,
            this.username,
            hashedPass
        ]
        );
    }

    async modificar(){
        // return this.pool.query(`
        // UPDATE 
        //     staff
        // SET 
        //     first_name=$2
        //     ,last_name=$3
        //     ,address_id=$4
        //     ,email=$5
        //     ,store_id=$6
        //     ,active=$7
        //     ,username=$8
        //     ,password=$9
        //     ,last_update=(SELECT current_timestamp(0))
        // WHERE
        //     staff_id=$1;           
        // `,
        // [
        //     this.staff_id,
        //     this.first_name,
        //     this.last_name,
        //     this.address_id,
        //     this.email,
        //     this.store_id,
        //     this.active,
        //     this.username,
        //     this.password
        // ]);
        return super.modificar(`
        UPDATE 
            staff
        SET 
            first_name=$2
            ,last_name=$3
            ,address_id=$4
            ,email=$5
            ,store_id=$6
            ,active=$7
            ,username=$8
            ,password=$9
            ,last_update=(SELECT current_timestamp(0))
        WHERE
            staff_id=$1;           
        `,
        [
            this.staff_id,
            this.first_name,
            this.last_name,
            this.address_id,
            this.email,
            this.store_id,
            this.active,
            this.username,
            this.password
        ]);
    }

    async borrar(id){
        return super.borrar(`
        DELETE FROM 
            staff
        WHERE
            staff_id = $1;
        `,
        [id] 
        );
    }

}



module.exports = Staff;