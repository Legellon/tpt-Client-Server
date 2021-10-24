const mysql = require('mysql2')

const connection = mysql.createConnection({
    database : process.env.DB,
        host : process.env.DB_HOST,
        user : process.env.DB_USER,
    password : process.env.DB_PASS
})

connection.connect((err) => {
    if (!err) {
        console.log("DB connection succeded...")
    } 
})

module.exports = connection