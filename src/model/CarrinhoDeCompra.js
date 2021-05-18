const Database = require('../db/config')

module.exports = {
    async get() {
        const db = await Database()

        const dados = await db.all(`SELECT * FROM lista_de_desejo`)

        await db.close()

        return dados
    },

    async update(newProduto,ID) {
        const db = await Database()

        await db.get(`UPDATE lista_de_desejo SET 
            IDproduto = "${newProduto.IDproduto}",
            quantidade = "${newProduto.quantidade}",
            tamanho = "${newProduto?.tamanho}"
        WHERE id = ${ID}
        `)

        await db.close()
    },

    async create(newProduto) {
        const db = await Database()

        await db.run(`INSERT INTO lista_de_desejo (
            id,
            IDproduto,
            quantidade,
            tamanho
        ) VALUES (
            ${newProduto.id},
            "${newProduto.IDproduto}",
            "${newProduto.quantidade}",
            "${newProduto?.tamanho}"
        )`)

        await db.close()
    },

    async delete(id) {
        const db = await Database()

        await db.run(`DELETE FROM lista_de_desejo WHERE id = ${id}`)

        await db.close()
    }
}