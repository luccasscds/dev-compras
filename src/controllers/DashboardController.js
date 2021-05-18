const Cep = require('../model/Cep')
const Usuarios = require('../model/Usuarios')
const Carrinho = require('../model/CarrinhoDeCompra')
const Produto = require('../model/Produtos')

module.exports = {
    async index(req,res) {
        const lista = await Carrinho.get()
        const produtos = await Produto.get()
        let users = await Usuarios.get()
        let cep = await Cep.get()
        let totalProduto = 0
        let bigValue = 0
        let omaisvendido = undefined
        let desejado = undefined
        let media = 0
        let User

        lista.forEach( produto => totalProduto += Number(produto.quantidade))

        users.forEach(user => {
            User = user.ativo === "true" ? { id: user.id, name: user.name, ativo: user.ativo } : undefined
        })
        
        User = User === undefined ? {id:'',name:'',ativo:'false'} : User


        produtos.forEach( produto => {
            produto.avaliacao = JSON.parse(produto.avaliacao)

            if(produto.vendidos > bigValue) {
                bigValue = produto.vendidos
                omaisvendido = produto
            }

            if(produto.id > 0) {
                let avaliacao = produto.avaliacao
                let soma = (avaliacao.s1 + avaliacao.s2 + avaliacao.s3 + avaliacao.s4 + avaliacao.s5)
                let mediaPonderada = ((1*avaliacao.s1) + (2*avaliacao.s2) + (3*avaliacao.s3) + (4*avaliacao.s4) + (5*avaliacao.s5)) / soma

                if(mediaPonderada > media) {
                    media = mediaPonderada.toFixed(1)
                    desejado = produto
                }
            }
        })

        return res.render('index', { cep: cep , user: User , quantidade: totalProduto, vendido: omaisvendido, desejado: desejado })
    }
}