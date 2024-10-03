const express = require('express')

const { userRegistrationValidation, userLoginValidation } = require('../services/fieldValidation.js')
const { userRouteCheck, userRegister, userLogin } = require('../controllers/user.controller.js')

const router = express.Router();

router.route('/').get(userRouteCheck)
router.route('/register').post(userRegistrationValidation, userRegister)
router.route('/login').get(userLoginValidation, userLogin)

module.exports = router;