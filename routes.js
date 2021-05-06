const express = require('express')
const route = express.Router()
const Home = require('./src/Controllers/HomeController')
const Login = require('./src/Controllers/LoginController')
const Contato = require('./src/Controllers/ContatoController')

const { LoginRequired } = require('./src/middleware/middleware')

route.get('/', Home.TelaInicial)


route.get('/login', Login.index)
route.get('/cadastro', Login.cadastro)
route.get('/logout', Login.logout)
route.post('/register', Login.register)
route.post('/login', Login.login)

// CRUD dos contatos

route.get('/contato', LoginRequired, Contato.contatoCreate)
route.get('/contato/:id', LoginRequired, Contato.contatoUpdate)
route.post('/contato/register', LoginRequired, Contato.register)
route.post('/contato/edit/:id', LoginRequired, Contato.edit)
route.get('/contato/delete/:id', LoginRequired, Contato.delete)
module.exports = route