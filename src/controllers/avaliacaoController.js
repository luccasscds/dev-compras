const Produtos = require("../model/Produtos")

module.exports = {
    index(req,res) {
        res.render('avaliacao')
    },
    async avaliar(req,res) {
        const idproduto = req.body.id
        const avaliado = req.body.avaliacao
        const produtos = await Produtos.get()

        produtos.forEach(produto => {
            if(produto.id == idproduto) {
                let produto_avaliacao = JSON.parse(produto.avaliacao)
                if(avaliado == 's1') {
                    produto_avaliacao.s1 += 1
                    Produtos.update({
                        ...produto,
                        avaliacao: JSON.stringify(produto_avaliacao)
                    },produto.id)
                }else if(avaliado == 's2') {
                    produto_avaliacao.s2 += 1
                    Produtos.update({
                        ...produto,
                        avaliacao: JSON.stringify(produto_avaliacao)
                    },produto.id)
                }else if(avaliado == 's3') {
                    produto_avaliacao.s3 += 1
                    Produtos.update({
                        ...produto,
                        avaliacao: JSON.stringify(produto_avaliacao)
                    },produto.id)
                }else if(avaliado == 's4') {
                    produto_avaliacao.s4 += 1
                    Produtos.update({
                        ...produto,
                        avaliacao: JSON.stringify(produto_avaliacao)
                    },produto.id)
                }else if(avaliado == 's5') {
                    produto_avaliacao.s5 += 1
                    Produtos.update({
                        ...produto,
                        avaliacao: JSON.stringify(produto_avaliacao)
                    },produto.id)
                }
            }
        })

        res.render('')
    }
}