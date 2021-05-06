require('dotenv').config()


const express = require('express')
const Routes = require('./routes')
const app = express()
const mongoose = require('mongoose')
mongoose.connect(process.env.connetingString, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
    .then(() => {
        app.emit('pronto')
    })
    .catch(e => console.log(e))

const session = require('express-session')
const mongoStore = require('connect-mongo')(session)
const flash = require('connect-flash')
const helmet = require('helmet')
const csrf = require('csurf')
const path = require('path')
const { CheckError, csrfMiddleware, middlewareGlobal } = require('./src/middleware/middleware')

const sessionOption = session({
    secret: "2340395",
    store: new mongoStore({ mongooseConnection: mongoose.connection }),
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 7,
        httpOnly: true
    }
})
app.use(sessionOption)
app.use(flash())
app.use(helmet())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static(path.resolve(__dirname, "public")))
app.set('views', path.resolve(__dirname, "src", "views"))
app.set('view engine', 'ejs')
app.use(csrf())
app.use(middlewareGlobal)
app.use(csrfMiddleware)
app.use(CheckError)
app.use(Routes)


app.on('pronto', () => {
    app.listen(8080, () => {
        console.log("Servidor ON")
    })
})