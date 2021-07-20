//    Auth Routes
const router = require('express').Router()
const {check} = require('express-validator')
const auth = require("../middleware/auth");
const authC = require('../controllers/authController')

router.post('/',
  authC.userAuth)

router.get('/',
  auth,
  authC.getAuthUser
)

module.exports = router
