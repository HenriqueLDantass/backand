const express = require('express')
const router = express.Router()
const usersController = require('./controllers/login_controller')
const filhosController = require('./controllers/filhos_controller')

//auth
router.post('/register', usersController.registerUserController)
router.post('/login', usersController.loginUserController)

//filhos 
router.post('/usuarios/:id/filhos', filhosController.insertFilho);
router.get('/usuarios/:id/filhos', filhosController.getFilho);
router.delete('/usuarios/:id/filhos', filhosController.deleteFilho)
router.put('/usuarios/:id/filhos/:idfilho', filhosController.updateFilho)



module.exports = router

