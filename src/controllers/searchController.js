const Produtos = require("../model/Produtos")

module.exports = {
    async view(req,res) {
        const search = req.body.search
        const produtos = await Produtos.get()
        
        const produto = produtos.filter( produto => {
            let conteudo = produto.departamento != undefined ? produto.departamento : '';
            let verificador = conteudo.indexOf(search) >= 0;
            if (verificador && search != "") { 
                //redirecionar paginas
                if(produto.departamento == search) {
                    return produto
                }
            }
        })
        
        if(produto.length == " ") {
            return res.send("Tente verificar a ortografia ou usar termos mais genéricos")
        }else {
            return res.redirect(`/departamento-${produto[0].departamento}`)
        }
    }
}