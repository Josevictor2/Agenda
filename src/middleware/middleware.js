exports.middlewareGlobal = (req, res, next) => {
    res.locals.errors = req.flash('errors')
    res.locals.success = req.flash('success')
    res.locals.user = req.session.user
    next()
}


exports.CheckError = (err, req, res, next) => {
    if (err) {
        return res.render('includes/error')
    }
    next()
}

exports.csrfMiddleware = (req, res, next) => {
    res.locals.csrfToken = req.csrfToken()
    next()
}

exports.LoginRequired = (req, res, next) => {
    if (!req.session.user) {
        req.flash('errors', "Você precisa está logado.")
        req.session.save(() => {
            res.redirect('/')
        })
        return
    }
    next()
}