const Contato = require("../models/ContatoModels")
exports.TelaInicial = async (req, res) => {
    const contato = new Contato(req.body)
    const contatos = await contato.BuscarPorContato()
    res.render('index', {
        contatos
    })
}

