const path = require('path')
const dotenv = require('dotenv')
const express = require('express')
const cookieParser = require('cookie-parser')

const server = express()
const public = path.join(__dirname, './public')

dotenv.config({path: './.env'})

//client part
server.use(express.urlencoded({ extended: false}))
server.use(cookieParser())
server.use(express.static(public))
server.set('view engine', 'ejs')
server.set('views', './public/views')

server.use('/', require('./routes/pages'))
server.use('/auth', require('./routes/auth'))
server.use('/dashboard', require('./routes/dashboard'))
server.use('/api', require('./api/router'))

server.listen(process.env.PORT)