const Produtos = require('../model/Produtos')
const Cep = require('../model/Cep')
const Usuarios = require('../model/Usuarios')
const Carrinho = require('../model/CarrinhoDeCompra')

module.exports = {
    async show(req,res) {
        const produtos = await Produtos.get()
        const lista = await Carrinho.get()
        let cep = await Cep.get()
        let users = await Usuarios.get()
        let filtroList = [];
        let totalProduto = 0
        let User
        
        lista.forEach( produto => totalProduto += Number(produto.quantidade))

        const produto = produtos.filter(produto => {
            if(produto.departamento == "camisa") {
                return produto
            }
        }) 

        const array = {
            add(id) {
                this.clear();
                filtroList = produto.filter(produto => {
                    let conteudo = produto.departamento != undefined ? produto.departamento : '';
                    let verificador = conteudo.indexOf(id) >= 0;
                    if (verificador) {
                        return produto
                    }
                })
            },
            
            clear() {
                let tamanho = filtroList.length;
                filtroList.forEach(produto => {
                    filtroList.splice(0, tamanho);
                })
            }
        }

        function filtro() {
            let {marca, price, cor, tamanho} = req.query;
            let notebook = "camisa";
            
            //arrays
            let marcas = [];
            let prices = [];
            let cores = [];
            let tamanhos = [];
            
            if (notebook != '' || marca != '' || price != '') {
                array.add("camisa")
                if (marca != '') {
                    marcas = filtroList.filter(produto => {
                        if(marca == produto.marca) {  
                            return produto
                        }else if(marca == "coolmind") {
                            marca = "the coolmind"
                            if(marca == produto.marca) {
                                marcas.push(produto);
                            }
                        }
                    });
                    if(marcas.length > 0){
                        array.clear()
                        marcas.forEach(produto => {
                            filtroList.push(produto);
                        })
                    }
                }
                if (price != "") {
                    filtroList.forEach(produto => {
                        if (price == "p1") {
                        if (produto.price <= 49) {
                            prices.push(produto);
                        }
                    }else if (price == "p2") {
                        if (produto.price >= 50 && produto.price <= 99) {
                            prices.push(produto);
                        }
                    }else if (price == "p3") {
                        if (produto.price >= 100 && produto.price <= 249) {
                            prices.push(produto);
                        }
                    }else if (price == "p4") {
                        if (produto.price >= 250) {
                            prices.push(produto);
                        }
                    }
                    });
                    if(prices.length > 0){
                        array.clear()
                        prices.forEach(produto => {
                            filtroList.push(produto);
                        })
                    }
                }
                if (cor != "") {
                    filtroList.forEach(produto => {
                        if (cor == "preto") {
                            if (cor == produto.cor) {
                                cores.push(produto);
                            }
                        }else if (cor == "vinho") {
                            if (cor == produto.cor) {
                                cores.push(produto);
                            }
                        }else if (cor == "branco") {
                            if (cor == produto.cor) {
                                cores.push(produto);
                            }
                        }
                    });
                    if(cores.length > 0){
                        array.clear()
                        cores.forEach(produto => {
                            filtroList.push(produto);
                        })
                    }
                }
                if (tamanho != "") {
                    filtroList.forEach(produto => {
                        let produto_tamanho = JSON.parse(produto.tamanho)
                        
                        if (tamanho == "pp") {
                            //verificar isso!!!
                            let soma = produto_tamanho.PP - 1;
                            let res = soma >= 0 ? soma : -1;
                            if (res >= 0) {
                                tamanhos.push(produto);
                            }
                        }else if (tamanho == "p") {
                            let soma = produto_tamanho.P - 1;
                            let res = soma >= 0 ? soma : -1;
                            if (res >= 0) {
                                tamanhos.push(produto);
                            }
                        }else if (tamanho == "m") {
                            let soma = produto_tamanho.M - 1;
                            let res = soma >= 0 ? soma : -1;
                            if (res >= 0) {
                                tamanhos.push(produto);
                            }
                        }else if (tamanho == "g") {
                            let soma = produto_tamanho.G - 1;
                            let res = soma >= 0 ? soma : -1;
                            if (res >= 0) {
                                tamanhos.push(produto);
                            }
                        }else if (tamanho == "gg") {
                            let soma = produto_tamanho.GG - 1;
                            let res = soma >= 0 ? soma : -1;
                            if (res >= 0) {
                                tamanhos.push(produto);
                            }
                        }
                    });
                    if(tamanhos.length > 0){
                        array.clear()
                        tamanhos.forEach(produto => {
                            filtroList.push(produto);
                        })
                    }
                }
            }
        }
        filtro()

        //dados do login
        users.forEach(user => {
            User = user.ativo === "true" ? { id: user.id, name: user.name, ativo: user.ativo } : undefined
        })
        User = User === undefined ? {id:'',name:'',ativo:'false'} : User
        //fim dados do login

        res.render('departamento-camisa',{ produtos: filtroList, cep: cep, user: User, quantidade: totalProduto })
    },

    async produtoShow(req,res) {
        const IDproduto = req.query.produto
        const produtos = await Produtos.get()
        const lista = await Carrinho.get()
        let cep = await Cep.get()
        let users = await Usuarios.get()
        let totalProduto = 0
        let User

        lista.forEach( produto => totalProduto += Number(produto.quantidade))

        const produto = produtos.find(produto => {
            if(produto.id === Number(IDproduto) && produto.departamento === "camisa") {
                produto.tamanho = JSON.parse(produto.tamanho)
                produto.avaliacao = JSON.parse(produto.avaliacao)
                return produto
            }
        })

        //dados do login
        users.forEach(user => {
            User = user.ativo === "true" ? { id: user.id, name: user.name, ativo: user.ativo } : undefined
        })
        User = User === undefined ? {id:'',name:'',ativo:'false'} : User
        //fim dados do login

        return res.render('camisa', { produto: produto, cep: cep, user: User, quantidade: totalProduto })
    }
}