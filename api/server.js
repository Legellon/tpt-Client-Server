const express = require('express')
const path = require('path')

const config = require('../settings/config')
const server = express()

const { SERVER_PORT } = config.api


server.use('/api', require('./router'))

const current_date = new Date().toUTCString()
server.listen(SERVER_PORT, console.log(`[${current_date}] API server started on ${SERVER_PORT}`))