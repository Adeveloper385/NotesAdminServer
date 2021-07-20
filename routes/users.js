//    Users Routes
const router = require('express').Router()
const userC = require('../controllers/usersController')
const {check} = require('express-validator')

router.post('/',
  [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'Agrega un email valido').isEmail(),
    check('password', 'La contraseña debe tener al menos 6 caracteres').isLength({ min: 6})
  ],
  userC.createUser)

module.exports = router
