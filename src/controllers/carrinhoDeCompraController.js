const Produtos = require("../model/Produtos")
const Carrinho = require("../model/CarrinhoDeCompra")
const Cep = require('../model/Cep')
const Usuarios = require('../model/Usuarios')

module.exports = {
    async index(req,res) {
        let cep = await Cep.get()
        let users = await Usuarios.get()
        let User
        const produtos = await Produtos.get()
        const lista = await Carrinho.get()
        let totalPrice = 0
        let totalProduto = 0
        let index = 0
        
        const produto = produtos.filter((produto) => {
            if(produto.id == lista[index]?.IDproduto) {
                
                let quantidade = lista[index]?.quantidade
                let tamanho = lista[index]?.tamanho
                
                totalPrice += (produto.price * quantidade)
                totalProduto += Number(quantidade)
                produto.quantidade = Number(quantidade)
                
                if(tamanho != '') {
                    let produto_tamanho = produto.departamento == 'camisa' ? JSON.parse(produto.tamanho) : ''
                    let estoque
                    
                    if(tamanho == 'PP'){
                        estoque = quantidade <= produto_tamanho.PP
                    }else if(tamanho == 'P'){
                        estoque = quantidade <= produto_tamanho.P
                    }else if(tamanho == 'M'){
                        estoque = quantidade <= produto_tamanho.M
                    }else if(tamanho == 'G'){
                        estoque = quantidade <= produto_tamanho.G
                    }else if(tamanho == 'GG'){
                        estoque = quantidade <= produto_tamanho.GG
                    }

                    if(estoque == true) {
                        //console.log('estoque')
                        produto.tamanho = tamanho
                    }else {
                        //console.log('sem estoque')
                    }
                }
                index ++
                return produto
            }
        })

        //dados do login
        users.forEach(user => {
            User = user.ativo === "true" ? { id: user.id, name: user.name, ativo: user.ativo } : undefined
        })
        User = User === undefined ? {id:'',name:'',ativo:'false'} : User
        //fim dados do login

        return res.render('carrinho-de-compra', { produtos: produto , total: totalPrice, quantidade: totalProduto, cep: cep, user: User })
    },

    async add(req,res) {
        const lista = await Carrinho.get()
        let {IDproduto,tamanho,quantidade,somarOUsubtrair} = req.body
        let qntFinal = Number(quantidade) + Number(somarOUsubtrair = somarOUsubtrair == undefined ? 0 : somarOUsubtrair)
        let verificador = false
        
        qntFinal = qntFinal > 0 ? qntFinal : 1
        lista.forEach(produto => {
            if(IDproduto == produto.IDproduto){
                verificador = true
                Carrinho.update({
                    IDproduto: IDproduto,
                    quantidade: qntFinal.toString(),
                    tamanho: tamanho
                },produto.id)
            }
        })
        if(verificador === false) {
            Carrinho.create({
                id: IDproduto,
                IDproduto: IDproduto,
                quantidade: quantidade,
                tamanho: tamanho
            })
        }
        return res.redirect(`carrinho-de-compra`)
    },

    async delete(req,res) {
        const id = req.body.id

        await Carrinho.delete(id)

        return res.redirect('carrinho-de-compra')
    }
}