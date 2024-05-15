const express = require('express')

const RedirectAuthenticatedUser = require('../middlewares/redirectAuthenticatedUser')
const IsAuth = require('../middlewares/isAuth')

const route = express.Router()

const {
    login_get,
    login_post,
    signup_get,
    signup_post,
    logout_get,
} = require('../controllers/authController')

// Login GET and POST 
route.get('/login',RedirectAuthenticatedUser,login_get)
route.post('/login',RedirectAuthenticatedUser, login_post)

// SignUp GET and POST
route.get('/signup',RedirectAuthenticatedUser, signup_get)
route.post('/signup',RedirectAuthenticatedUser, signup_post)


// LogOut GET
route.get('/logout',IsAuth,logout_get)

module.exports = route