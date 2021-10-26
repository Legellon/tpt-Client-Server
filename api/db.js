const mysql = require('mysql2')
const config = require('../config')

const { DB_NAME, DB_HOST, DB_USER, DB_PASS } = config

const connection = mysql.createConnection({
    database : DB_NAME,
        host : DB_HOST,
        user : DB_USER,
    password : DB_PASS
})

connection.connect((err) => {
    if (!err) {
        console.log("DB connection succeded...")
    } 
})

module.exports = connection