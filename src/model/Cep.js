const Database = require('../db/config')

module.exports = {
    async get() {
        const db = await Database()

        const dados = await db.get(`SELECT * FROM cep`)

        await db.close()

        return dados
    },

    async update(newCep) {
        const db = await Database()

        await db.run(`UPDATE cep SET 
        cep = "${newCep.cep}",
        logradouro = "${newCep.logradouro}",
        complemento = "${newCep.complemento}",
        bairro = "${newCep.bairro}",
        localidade = "${newCep.localidade}",
        uf = "${newCep.uf}",
        ibge = "${newCep.ibge}",
        gia = "${newCep.gia}",
        ddd = "${newCep.ddd}",
        siafi = "${newCep.siafi}"
        `)

        await db.close()
    }
}