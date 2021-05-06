const mongoose = require('mongoose')
const validator = require('validator')


const ContatoSchema = new mongoose.Schema({

    nome: { type: String, required: true },
    sobrenome: { type: String, required: false, default: "" },
    email: { type: String, required: false, default: "" },
    telefone: { type: String, required: true },
    data: { type: Date, default: Date.now }
})

const ContatoModel = mongoose.model('Contato', ContatoSchema)

class Contato {
    constructor(body) {
        this.body = body
        this.errors = []
        this.contato = null
    }

    async register() {
        this.valida()
        if (this.errors.length > 0) return

        this.contato = await ContatoModel.create(this.body)


    }

    async BuscarPorId(id) {
        if (typeof id !== 'string') return
        const user = await ContatoModel.findById(id)

        return user
    }

    async BuscarPorContato() {
        const contatos = await ContatoModel.find()
            .sort({ cridoEm: -1 })

        return contatos
    }

    async delete(id) {
        if (typeof id !== 'string') return
        const contato = await ContatoModel.findOneAndDelete({ _id: id })

        return contato
    }

    async edit(id) {
        if (typeof id !== 'string') return
        this.valida()
        if (this.errors.lenght > 0) return
        this.contato = await ContatoModel.findByIdAndUpdate(id, this.body, { new: true })

    }

    valida() {
        this.cleanUp()

        if (this.body.email && !validator.isEmail(this.body.email)) {
            this.errors.push('Email não válido')
        }

        if (!this.body.nome) {
            this.errors.push('nome é um campo obrigatório')
        }
        if (!this.body.telefone) {
            this.errors.push('telefone é um campo obrigatório')
        }
    }



    cleanUp() {
        for (const key in this.body) {
            if (typeof this.body[key] !== 'string') {
                this.body[key] = ''
            }
        }

        this.body = {
            nome: this.body.nome,
            sobrenome: this.body.sobrenome,
            email: this.body.email,
            telefone: this.body.telefone
        }
    }
}

module.exports = Contato 