const Usuarios = require('../model/Usuarios')

module.exports = {
    index(req,res) {
        return res.render('login')
    },
    async login(req,res) {
        const login = req.body
        const usuarios = await Usuarios.get()
        let verificador = false

        const selectUser = usuarios.find(user => {
            if(user.email === login.email && user.password == login.password){
                verificador = true
                return user
            }
        })

        if(verificador === true) {
            await Usuarios.update({
                ...selectUser,
                ativo: "true"
            }, selectUser.id)

            return res.redirect('/')
        }else {
            return res.redirect('login')
        }

    },

    async exit(req,res) {
        const idUser = req.params.id
        await Usuarios.exit(idUser)
        return res.redirect('/')
    }
}