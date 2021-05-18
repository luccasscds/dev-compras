const Produtos = require('../model/Produtos')
const Cep = require('../model/Cep')
const Usuarios = require('../model/Usuarios')
const Carrinho = require('../model/CarrinhoDeCompra')

module.exports = {
    async index(req,res) {
        const IDproduto = req.query.produto
        const produtos = await Produtos.get()
        const lista = await Carrinho.get()
        let cep = await Cep.get()
        let users = await Usuarios.get()
        let User
        let totalProduto = 0

        const produto = produtos.find(produto => {
            if(produto.id === Number(IDproduto) && produto.departamento === "notebook") {
                produto.avaliacao = JSON.parse(produto.avaliacao)
                return produto
            }
        })

        lista.forEach( produto => totalProduto += Number(produto.quantidade))

        //dados do login
        users.forEach(user => {
            User = user.ativo === "true" ? { id: user.id, name: user.name, ativo: user.ativo } : undefined
        })
        User = User === undefined ? {id:'',name:'',ativo:'false'} : User
        //fim dados do login

        return res.render('notebook', { produto: produto, cep: cep, user: User, quantidade: totalProduto })
    },

    async show(req,res) {
        let cep = await Cep.get()
        let users = await Usuarios.get()
        let User
        const lista = await Carrinho.get()
        const produtos = await Produtos.get()
        let filtroList = [];
        let totalProduto = 0

        
        const produto = produtos.filter(produto => {
            if(produto.departamento == "notebook") {
                return produto
            }
        }) 

        lista.forEach( produto => totalProduto += Number(produto.quantidade))

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
            let {marca, price, so, cpu, ram ,hd ,tela} = req.query;
            let notebook = "notebook";
            
            //arrays
            let marcas = [];
            let prices = [];
            let sistemas = [];
            let cpus = [];
            let rams = [];
            let hds = [];
            let telas = [];
            
            if (notebook != '' || marca != '' || price != '') {
                array.add("notebook")
                if (marca != '') {
                    marcas = filtroList.filter(produto => {
                        if(marca == produto.marca) {
                            
                            return produto
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
                            if (produto.price <= 1_500) {
                                prices.push(produto);
                            }
                        }else if (price == "p2") {
                            if (produto.price > 1_500 && produto.price < 2_000) {
                                prices.push(produto);
                            }
                        }else if (price == "p3") {
                            if (produto.price > 2_000 && produto.price < 3_000) {
                                prices.push(produto);
                            }
                        }else if (price == "p4") {
                            if (produto.price > 3_000 && produto.price < 4_000) {
                                prices.push(produto);
                            }
                        }else if (price == "p5") {
                            if (produto.price > 4_000) {
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
                if (so != "") {
                    filtroList.forEach(produto => {
                        if (so == "so1") {
                            if (produto.so == "linux") {
                                sistemas.push(produto);
                            }
                        }else if (so == "so2") {
                            if (produto.so == "windows 10") {
                                sistemas.push(produto);
                            }
                        }else if (so == "so3") {
                            if (produto.so == "windows 8") {
                                sistemas.push(produto);
                            }
                        }
                    });
                    if(sistemas.length > 0){
                        array.clear()
                        sistemas.forEach(produto => {
                            filtroList.push(produto);
                        })
                    }
                }
                if (cpu != "") {
                    filtroList.forEach(produto => {
                        if (cpu == "i3") {
                            if (produto.cpu == "i3") {
                                cpus.push(produto);
                            }
                        }else if (cpu == "i5") {
                            if (produto.cpu == "i5") {
                                cpus.push(produto);
                            }
                        }
                    });
                    if(cpus.length > 0){
                        array.clear()
                        cpus.forEach(produto => {
                            filtroList.push(produto);
                        })
                    }
                }
                if (ram != "") {
                    filtroList.forEach(produto => {
                        if (ram == "r1") {
                            if (produto.m_ram <= 1) {
                                rams.push(produto);
                            }
                        }else if (ram == "r2") {
                            if (produto.m_ram == 2) {
                                rams.push(produto);
                            }
                        }else if (ram == "r3") {
                            if (produto.m_ram == 4) {
                                rams.push(produto);
                            }
                        }else if (ram == "r4") {
                            if (produto.m_ram == 8) {
                                rams.push(produto);
                            }
                        }else if (ram == "r5") {
                            if (produto.m_ram >= 12) {
                                rams.push(produto);
                            }
                        }
                    });
                    if(rams.length > 0){
                        array.clear()
                        rams.forEach(produto => {
                            filtroList.push(produto);
                        })
                    }
                }
                if (hd != "") {
                    filtroList.forEach(produto => {
                        if (hd == "h1") {
                            if (produto.hd <= 199) {
                                hds.push(produto);
                            }
                        }else if (hd == "h2") {
                            if (produto.hd >= 200 && produto.hd <= 499) {
                                hds.push(produto);
                            }
                        }else if (hd == "h3") {
                            if (produto.hd >= 500 && produto.hd <= 999) {
                                hds.push(produto);
                            }
                        }else if (hd == "h4") {
                            if (produto.hd >= 1000) {
                                hds.push(produto);
                            }
                        }
                    });
                    if(hds.length > 0){
                        array.clear()
                        hds.forEach(produto => {
                            filtroList.push(produto);
                        })
                    }
                }
                if (tela != "") {
                    filtroList.forEach(produto => {
                        if (tela == "t1") {
                            if (produto.tela <= 10) {
                                telas.push(produto);
                            }
                        }else if (tela == "t2") {
                            if (produto.tela >= 11 && produto.tela <= 12) {
                                telas.push(produto);
                            }
                        }else if (tela == "t3") {
                            if (produto.tela >= 13 && produto.tela <= 14) {
                                telas.push(produto);
                            }
                        }else if (tela == "t4") {
                            if (produto.tela >= 15) {
                                telas.push(produto);
                            }
                        }
                    });
                    if(telas.length > 0){
                        array.clear()
                        telas.forEach(produto => {
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

        return res.render(`departamento-notebook`, { produtos: filtroList, cep: cep, user: User, quantidade: totalProduto })
    }
}