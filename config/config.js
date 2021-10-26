const dotenv = require('dotenv')

dotenv.config({
    path: './.env'
})

module.exports = {
    defaults: {
        SECRET_TOKEN: process.env.TOKEN_KEY,
        SERVER_PORT: process.env.PORT,
    },

    database: {
        DB_NAME: process.env.DB_NAME,
        DB_HOST: process.env.DB_HOST,
        DB_USER: process.env.DB_USER,
        DB_PASS: process.env.DB_PASS,
    },
}