require('dotenv').config()

const express = require('express')
const path = require('path')
const passport = require('passport')
const session = require('express-session')

const mainRouter = require('./routes/main')
const authRouter = require('./routes/auth')
const ErrorHandler = require('./middlewares/errorHandler')

const app = express()

app.use(session({secret: process.env.SECRET_KEY || 'cats',resave: false, saveUninitialized: true}))
app.use(passport.session())
app.use(express.urlencoded({extended: true}))
app.engine('ejs', require('express-ejs-extend'));
app.set("views", path.join(__dirname, 'views'));
app.set("view engine", "ejs");

// Passport Configuration
require('./utils/passport')

// Connect Database to app
require('./utils/dbConnect')

app.use((req, res, next) => {
    res.locals.currentUser = req.user
    res.locals.auth = req.isAuthenticated()
    res.locals.formValues = null
    res.locals.errors = null
    next()
})


app.use('/', mainRouter)
app.use('/auth',authRouter)

app.use(ErrorHandler)

app.listen(5000,()=>{
    console.log('app started...')
})