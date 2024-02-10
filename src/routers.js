const express = require('express')
const router = express.Router()
const usersController = require('./controllers/login_controller')


router.post('/register', usersController.registerUserController)
router.post('/login', usersController.loginUserController)


module.exports = router

