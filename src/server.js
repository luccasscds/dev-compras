const express = require('express')
const server = express()
const routes = require('./routes')
const path = require('path')
const { urlencoded } = require('express')

//usando o template ejs
server.set('view engine', 'ejs')

//mostrar o caminho para os arquivos para views
server.set('views', path.join(__dirname, 'views'))

//criar rotas para dos arquivos .js , .css e imagens
server.use(express.static("public"))

//usar o req.body
server.use(express.urlencoded({extended: true}))

//chamando as routes
server.use(routes)

server.listen(process.env.PORT || 3000)