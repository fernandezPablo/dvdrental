const { Router } = require('express');
const { 
        getActores,
        postActores,
        deleteActores,
        putActores 
    } = require('../controllers/actores.controller');

    const { validarJWT } = require('../middlewares/validar-jwt');


const router = Router();

router.get('/', getActores);
router.post('/', postActores);
router.put('/:id', putActores);
router.delete(
    '/:id',
    [validarJWT], 
    deleteActores);

module.exports = router