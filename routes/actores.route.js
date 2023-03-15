const { Router } = require('express');
const { 
        getActores,
        postActores,
        deleteActores,
        putActores 
    } = require('../controllers/actores.controller');

const { validarJWT } = require('../middlewares/validar-jwt');


const router = Router();

router.get('/',
    [validarJWT], 
    getActores);
router.post('/',
    [validarJWT], 
    postActores);
router.put('/:id',
    [validarJWT], 
    putActores);
router.delete(
    '/:id',
    [validarJWT], 
    deleteActores);

module.exports = router