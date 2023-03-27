const { Router } = require('express');
const { 
        listarCountries,
        guardarCountry 
    } = require('../controllers/country.controller');

const { validarJWT } = require('../middlewares/validar-jwt');


const router = Router();

router.get('/',
    // [validarJWT], 
    listarCountries);
router.post('/', guardarCountry);

module.exports = router