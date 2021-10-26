const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const config = require('./config/config')

const server = express()
const public = path.join(__dirname, './public')

const { SERVER_PORT } = config.defaults

//client side
server.use(express.urlencoded({ extended: false}))
server.use(cookieParser())
server.use(express.static(public))

server.set('view engine', 'ejs')
server.set('views', './public/views')
//

server.use('/', require('./routes/pages'))
server.use('/auth', require('./routes/auth'))
server.use('/dashboard', require('./routes/dashboard'))
server.use('/api', require('./api/router'))

server.listen(SERVER_PORT)