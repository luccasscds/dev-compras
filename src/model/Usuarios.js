const Database = require('../db/config')

module.exports = {
    async get() {
        const db = await Database()

        const dados = await db.all(`SELECT * FROM usuarios`)

        await db.close()

        return dados
    },

    async update(newUser, idUser) {
        const db = await Database()

        await db.get(`UPDATE usuarios SET 
            email = "${newUser.email}",
            name = "${newUser.name}",
            password = "${newUser.password}",
            ativo = "${newUser.ativo}"
         WHERE id = ${idUser}
        `)

        await db.close()
    },

    async create(newUsuario) {
        const db = await Database()

        const dados = await db.run(`INSERT INTO usuarios (
            email,
            name,
            password,
            ativo
        ) VALUES (
            "${newUsuario.email}",
            "${newUsuario.name}",
            "${newUsuario.password}",
            "${newUsuario.ativo}"
        )`);

        await db.close()

        return dados
    },

    async exit(id) {
        const db = await Database()

        await db.get(`UPDATE usuarios SET 
        ativo = "${false}"
        WHERE id = ${id}
        `)

        await db.close()
    }
}