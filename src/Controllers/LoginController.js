const Register = require('../models/RegistraModels')

exports.index = (req, res) => {
    if (req.session.user) {
        res.render("includes/error")
    } else {
        res.render('login')
    }

}
exports.cadastro = (req, res) => {
    res.render('cadastrar')
}

exports.register = async function (req, res) {

    try {
        const reg = new Register(req.body)

        await reg.register()

        if (reg.errors.length > 0) {
            req.flash('errors', reg.errors)
            req.session.save(function () {
                return res.redirect('/cadastro')
            })
            return
        }
        req.flash('success', "Usuário criado com sucesso.")
        req.session.save(function () {
            return res.redirect('/login')
        })
    } catch (error) {
        console.log(error)
        return res.render('includes/error')
    }

}

exports.login = async function (req, res) {

    try {
        const login = new Register(req.body)

        await login.logar()

        if (!login.user) {
            req.flash('errors', login.errors)
            req.session.save(function () {
                return res.redirect('/login')
            })
            return
        }
        req.flash('success', "Acesso permitido")
        req.session.user = login.user
        req.session.save(function () {
            return res.redirect('/')
        })
    } catch (error) {
        console.log(error)
        return res.render('includes/error')
    }

}

exports.logout = (req, res) => {
    req.session.destroy()
    res.redirect('/login')
}