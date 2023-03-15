const Server = require('./modelos/server.modelo');

//Importar archivos env
require('dotenv').config();
const data = require('./data/datos');

const server = new Server();

server.listen();

module.exports = data;