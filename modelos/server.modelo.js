const express = require('express');
const cors = require('cors');

const { validarJWT } = require('../middlewares/validar-jwt');

class Server{

    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.actoresPath = '/api/actores';
        this.staffPath = '/api/staff';
        this.authPath = '/api/auth';

        //middlewares
        this.middlewares();

        //Rutas
        this.routes();
    }

    routes(){
        this.app.use( this.actoresPath, [validarJWT], require('../routes/actores.route') );
        this.app.use( this.staffPath, /*[validarJWT],*/ require('../routes/staff.route') );
        this.app.use( this.authPath, require('../routes/auth.route') );
    }

    middlewares(){
        //*CORS
        this.app.use( cors() );
        //*Parseo de body
        this.app.use( express.json() );
    }    

    listen(){
        this.app.listen(8080, ()=>{
            console.log('Servidor corriendo en el puerto', this.port);
        });
    }

}

module.exports = Server




