const Server = require('./modelos/server.modelo');

//Importar archivos env
require('dotenv').config();

const server = new Server();

server.listen();