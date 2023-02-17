const { Router } = require('express');
const { check } = require('express-validator');
const { validationResult } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');
const { login } = require('../controllers/auth.controller');

const router = Router();

router.post(
    '/login',
    [
        check('correo', 'El correo no es válido').isEmail(),
        check('password', 'El password es requerido').not().isEmpty(),
        validarCampos,
    ],
     login);

module.exports = router