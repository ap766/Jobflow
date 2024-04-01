const express = require('express')

// controller functions
const { loginUser, signupUser } = require('../controllers/userController')

//Router(): Router is a class provided by Express.js that allows you to create modular, mountable route handlers. It acts as a mini express application that can be used for handling routes.
const router = express.Router()

// login route
router.post('/login', loginUser)

// signup route
router.post('/signup', signupUser)

module.exports = router