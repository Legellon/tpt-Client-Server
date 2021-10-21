const path = require('path')
const dotenv = require('dotenv')
const express = require('express')
const cookieParser = require('cookie-parser')

const server = express()
const public = path.join(__dirname, './public')

dotenv.config({path: './.env'})

server.set('view engine', 'ejs')
server.set('views', './public/views')

server.use(cookieParser())
server.use(express.json())
server.use(express.static(public))
server.use(express.urlencoded({ extended: false }))

server.use('/', require('./routes/pages.js'))
server.use('/auth', require('./routes/auth.js'))
server.use('/dashboard', require('./routes/dashboard.js'))
server.use('/api', require('./routes/api'))

server.listen(process.env.PORT)