const { Router } = require('express');
const { 
        getStaff,
        getStaffUno,
        postStaff,
        deleteStaff,
        putStaff 
    } = require('../controllers/staff.controller');

const router = Router();

router.get('/', getStaff);
router.get('/:id', getStaffUno);
router.post('/', postStaff);
router.put('/:id', putStaff);
router.delete('/:id', deleteStaff);

module.exports = router