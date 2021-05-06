import 'core-js/stable'
import 'regenerator-runtime/runtime'

import Login from './modules/login'

const login = new Login('.formlogin')
const cadastro = new Login('.formcadastro')

login.init()
cadastro.init()