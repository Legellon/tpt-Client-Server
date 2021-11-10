const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')

const config = require('../settings/config')
const server = express()

const { SERVER_PORT } = config.client

server.use(express.urlencoded({ extended: false }))
server.use(cookieParser())

server.use(express.static(path.join(__dirname, './public')))
server.set('view engine', 'ejs')
server.set('views', path.join(__dirname, './public/views'))


server.use('/', require('./routes/pages'))
server.use('/auth', require('./routes/auth'))
server.use('/dashboard', require('./routes/dashboard'))

const current_date = new Date().toUTCString()
server.listen(SERVER_PORT, console.log(`[${current_date}] client server started on ${SERVER_PORT}`))