const Usuarios = require('../model/Usuarios')

module.exports = {
    index(req,res) {
        return res.render('cadastro')
    },
    async create(req,res) {
        const newUser = {
            ...req.body,
            ativo: "true"
        }
        const usuarios = await Usuarios.get()
        let verificador = false

        usuarios.forEach(user => {
            if(user.email === newUser.email) {
                verificador = true
            }
        }) 
        
        if(verificador === false) {
            await Usuarios.create(newUser)
            return res.redirect('/')
        }
        
        return res.redirect('cadastro')
    }
}