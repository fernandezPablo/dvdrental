const { Router } = require('express');
const { 
        listarCategorias,
        guardarCategoria 
    } = require('../controllers/categories.controller');

const { validarJWT } = require('../middlewares/validar-jwt');


const router = Router();

router.get('/',
    // [validarJWT], 
    listarCategorias);
router.post('/', guardarCategoria);

module.exports = router