const { Router } = require('express');
const { check } = require('express-validator');
const { validationResult } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');
const { validarRefreshJWT } = require('../middlewares/validar-jwt');
const { login, refreshToken } = require('../controllers/auth.controller');

const router = Router();

router.post(
    '/login',
    [
        check('correo', 'El correo no es válido').isEmail(),
        check('password', 'El password es requerido').not().isEmpty(),
        validarCampos,
    ],
     login);

router.post(
    '/refresh-token',
    [validarRefreshJWT],
    refreshToken
);

module.exports = router