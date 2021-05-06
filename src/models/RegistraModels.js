const mongoose = require('mongoose')
const validator = require('validator')
const bcryptjs = require('bcryptjs')

const RegistrarSchema = new mongoose.Schema({
    email: { type: String, required: true },
    password: { type: String, required: true }
})

const RegistrarModel = mongoose.model('Registrar', RegistrarSchema)

class Registrar {
    constructor(body) {
        this.body = body
        this.errors = []
        this.user = null
    }

    async register() {
        this.valida()
        if (this.errors.length > 0) return

        await this.userExists()

        if (this.errors.length > 0) return

        // gerando uma cryptografia para a senha (npm i bcryptjs))
        const salt = bcryptjs.genSaltSync()
        this.body.password = bcryptjs.hashSync(this.body.password, salt)
        this.user = await RegistrarModel.create(this.body)

    }

    async logar() {
        this.valida()
        if (this.errors.length > 0) return

        this.user = await RegistrarModel.findOne({ email: this.body.email })

        if (!this.user) {
            this.errors.push('Usuário não existe')
            return
        }


        if (!bcryptjs.compareSync(this.body.password, this.user.password)) {
            this.errors.push("Senha Inválida")
            this.user = null
            return
        }
    }

    valida() {
        this.cleanUp()

        if (!validator.isEmail(this.body.email)) {
            this.errors.push('Email não válido')
        }

        if (this.body.password.length < 6 || this.body.password.length > 40) {
            this.errors.push('senha não válida')
        }
    }

    async userExists() {
        this.user = await RegistrarModel.findOne({ email: this.body.email })

        if (this.user) {
            this.errors.push("Usuário existente.")
        }
    }

    cleanUp() {
        for (const key in this.body) {
            if (typeof this.body[key] !== 'string') {
                this.body[key] = ''
            }
        }

        this.body = {
            email: this.body.email,
            password: this.body.password
        }
    }
}

module.exports = Registrar 