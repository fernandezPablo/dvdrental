const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const { validarJWT } = require('../middlewares/validar-jwt');

class Server{

    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.actoresPath = '/api/actores';
        this.staffPath = '/api/staff';
        this.authPath = '/api/auth';
        this.countriesPath = '/api/countries';
        this.categoriesPath = '/api/categories';

        //middlewares
        this.middlewares();

        //Rutas
        this.routes();
    }

    routes(){
        this.app.use( this.actoresPath, [validarJWT], require('../routes/actores.route') );
        this.app.use( this.staffPath, /*[validarJWT],*/ require('../routes/staff.route') );
        this.app.use( this.authPath, require('../routes/auth.route') );
        this.app.use( this.countriesPath, [validarJWT], require('../routes/countries.route') );
        this.app.use( this.categoriesPath, require('../routes/categories.route') );
        this.app.get('/api/prueba', (req, res) => res.status(200).json({msg: 'prueba...'}));
    }

    middlewares(){
        //*CORS
        this.app.use( cors({origin: 'http://localhost:4200', credentials: true}) );
        //*Parseo de body
        this.app.use( express.json() );
        this.app.use( cookieParser());
    }    

    listen(){
        this.app.listen(8080, ()=>{
            console.log('Servidor corriendo en el puerto', this.port);
        });
    }

}

module.exports = Server




