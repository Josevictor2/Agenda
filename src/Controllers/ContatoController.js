const Contato = require('../models/ContatoModels')
exports.contatoCreate = (req, res) => {
    res.render('contato', { contato: {} })
}

exports.register = async (req, res) => {
    try {

        const contato = new Contato(req.body)
        await contato.register()


        if (contato.errors.length > 0) {
            req.flash('errors', contato.errors)
            req.session.save(function () {
                res.redirect('/contato')
                return
            })
        } else {
            req.flash('success', "Contato registrado com sucesso")
            req.session.save(function () {
                res.redirect(`/contato/${contato.contato._id}`)
                return
            })
        }
        return
    } catch (e) {
        return res.render("./includes/error")
    }
}

exports.contatoUpdate = async (req, res) => {
    if (!req.params.id) {
        return res.render("./includes/error")
    }
    const cont = new Contato(req.body)
    const contato = await cont.BuscarPorId(req.params.id)

    if (!contato) {
        return res.render("./includes/error")
    }

    res.render('contato', {
        contato
    })
}

exports.edit = async (req, res) => {
    try {
        if (!req.params.id) {
            return res.render("./includes/error")
        }
        const contato = new Contato(req.body)
        await contato.edit(req.params.id)

        if (contato.errors.length > 0) {
            req.flash('errors', contato.errors)
            req.session.save(function () {
                res.redirect('/contato')
                return
            })
        } else {
            req.flash('success', "Contato alterado com sucesso")
            req.session.save(function () {
                res.redirect(`/contato/${contato.contato._id}`)
                return
            })
        }
        return
    } catch (error) {
        return res.render("./includes/error")
    }

}

exports.delete = async (req, res) => {
    if (!req.params.id) {
        return res.render("./includes/error")
    }
    const cont = new Contato(req.body)
    const contato = await cont.delete(req.params.id)

    if (!contato) {
        return res.render("./includes/error")
    }

    req.flash('success', "Contato apagado com sucesso")
    req.session.save(function () {
        res.redirect(`/`)
        return
    })
}
