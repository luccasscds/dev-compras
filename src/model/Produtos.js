const Database = require('../db/config')

module.exports = {
    async get() {
        const db = await Database()

        const roupas = await db.all(`SELECT * FROM roupas`)
        
        const notebooks = await db.all(`SELECT * FROM notebooks`)

        await db.close()

        return [
            ...notebooks,
            ...roupas
        ]
    },

    async update(newProduto,id) {
        const db = await Database()

        if(newProduto.departamento == 'camisa') {
            await db.get(`UPDATE roupas SET 
                departamento = "${newProduto.departamento}",
                photo = "${newProduto.photo}",
                nome = "${newProduto.nome}",
                description = "${newProduto.description}",
                marca = "${newProduto.marca}",
                cor = "${newProduto.cor}",
                tamanho = '${newProduto.tamanho}',
                price = ${newProduto.price},
                quantidade = ${newProduto.quantidade},
                estoque = ${newProduto.estoque},
                avaliacao = '${newProduto.avaliacao}' 
             WHERE id = ${id}
            `)
        }else if(newProduto.departamento == 'notebook') {
            await db.get(`UPDATE notebooks SET 
                departamento = "${newProduto.departamento}",
                photo = "${newProduto.photo}",
                nome = "${newProduto.nome}",
                description = "${newProduto.description}",
                marca = "${newProduto.marca}",
                so = "${newProduto.so}",
                cpu = "${newProduto.cpu}",
                tela = ${newProduto.tela},
                m_ram = ${newProduto.m_ram},
                hd = ${newProduto.hd},
                placa_de_video = "${newProduto.placa_de_video}",
                price = ${newProduto.price},
                quantidade = ${newProduto.quantidade},
                estoque = ${newProduto.estoque},
                avaliacao = "${newProduto.avaliacao}" 
             WHERE id = ${id}
            `)
        }

        await db.close()
    }
}