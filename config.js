const dotenv = require('dotenv')

dotenv.config({
    path: './.env'
})

module.exports = {
    SECRET_TOKEN: process.env.TOKEN_KEY,
    PORT: process.env.PORT,

    DB_NAME: process.env.DB,
    DB_HOST: process.env.DB_HOST,
    DB_USER: process.env.DB_USER,
    DB_PASS: process.env.DB_PASS
}