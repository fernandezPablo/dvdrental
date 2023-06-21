const { Router } = require('express');
const { 
        listarCountries,
        guardarCountry,
        existePais 
    } = require('../controllers/country.controller');

const { validarJWT } = require('../middlewares/validar-jwt');


const router = Router();

router.get('/',
    // [validarJWT], 
    listarCountries);
router.post('/', guardarCountry);
router.get('/existepais', existePais);

module.exports = router