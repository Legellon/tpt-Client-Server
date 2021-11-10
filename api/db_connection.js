const mysql = require('mysql2')
const config = require('../settings/config')

const { DB_NAME, DB_HOST, DB_USER, DB_PASS } = config.database

const connection = mysql.createConnection({
    database : DB_NAME,
        host : DB_HOST,
        user : DB_USER,
    password : DB_PASS
})

connection.connect((err) => {
    err ? console.log(err) : console.log("DB connection succeded...")
})

module.exports = connection