const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const db = require('../models/db.js')

const secrect_token = process.env.TOKEN_KEY

async function register(req, res) {
    const { password } = req.body
    const hashed_psw = await bcrypt.hash(password, 10)
    db.query(`INSERT INTO users (userID, role, password) VALUES (NULL, 'admin', '${hashed_psw}')`)
    res.status(200)
}

function requireAuth(req, res, next) {
    const token = req.cookies.jwt;
    if(token) {
        jwt.verify(token, secrect_token)
        next()
    } else {
        res.redirect('/login');
    }
}

function login(req, res) {
    const { password } = req.body
    db.query(`SELECT password,userID FROM users`, async (err, result) => {
        const record = result[0]
        if (await bcrypt.compare(password, record.password)) {
            const user_id = record.userID;

            const token = jwt.sign(user_id, secrect_token)
            res.cookie('jwt', token, {httpOnly: true, maxAge: 900000})

            res.status(200).redirect('/dashboard')
        }
    })
}

module.exports = {
    register,
    login,
    requireAuth
}