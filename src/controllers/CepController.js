const Cep = require('../model/Cep')

module.exports = {
    async index(req,res) {
        return res.render('cep')
    },
    async verificar(req,res) {
        const dados_cep = req.body

        let verificador = dados_cep.cep == " " || dados_cep.cep == undefined ? true : false
        
        if(verificador === false) {
            await Cep.update(dados_cep)
        }

        return res.redirect('/')
    }
}