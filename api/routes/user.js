const route = require('express').Router()
const {getAllUserController, registerController, loginController} = require('../controllers/user')

route.get('/', getAllUserController)

route.post('/register', registerController)

route.post('/login', loginController)

module.exports = route