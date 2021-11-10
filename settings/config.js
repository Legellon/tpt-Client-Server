const path = require('path')
const dotenv = require('dotenv').config({path: path.join(__dirname, './.env')})

const config = {
    client: {
        SERVER_PORT: process.env.CLIENT_PORT,
    },

    api: {
        SECRET_TOKEN: process.env.TOKEN_KEY,
        SERVER_PORT: process.env.SERVER_PORT,
    },

    database: {
        DB_NAME: process.env.DB_NAME,
        DB_HOST: process.env.DB_HOST,
        DB_USER: process.env.DB_USER,
        DB_PASS: process.env.DB_PASS,
    },
}

module.exports = config