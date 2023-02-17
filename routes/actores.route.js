const { Router } = require('express');
const { 
        getActores,
        postActores,
        deleteActores,
        putActores 
    } = require('../controllers/actores.controller');

const router = Router();

router.get('/', getActores);
router.post('/', postActores);
router.put('/:id', putActores);
router.delete('/:id', deleteActores);

module.exports = router