const { Router } = require('express');
const { 
        getStaff,
        postStaff,
        deleteStaff,
        putStaff 
    } = require('../controllers/staff.controller');

const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.get('/', getStaff);
router.post('/', postStaff);
router.put('/:id', putStaff);
router.delete('/:id', deleteStaff);

module.exports = router