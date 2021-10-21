const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const db = require('../models/db.js')
const http = require('http')

const secrect_token = process.env.TOKEN_KEY

module.exports = {
    async Register(req, res) {
        const { password } = req.body

        const data = JSON.stringify({
            password: password
        })

        const options = {
            protocol: 'http:',
            hostname: 'localhost',
            port: 3000,
            path: '/api/registration',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': data.length
            }
        }

        const request = http.request(options)
        request.write(data)
        request.end

        res.status(200).redirect('/auth')
    },

    Login(req, res) {
        const { password } = req.body
        db.query(`SELECT password,userID FROM users`, async (err, result) => {
            const record = result[0]
            console.log(record)
            if (await bcrypt.compare(password, record.password)) {
                const user_id = record.userID
    
                const token = jwt.sign(user_id, secrect_token)
                res.cookie('jwt', token, {httpOnly: true, maxAge: 900000})
    
                res.status(200).redirect('/dashboard')
            }
        })
        res.status(403)
    },

    RequireAuth(req, res, next) {
        const token = req.cookies.jwt;
        if(token) {
            jwt.verify(token, secrect_token)
            next()
        } else {
            res.status(403).redirect('/auth');
        }
    },

    RenderLogin(req, res) {
        res.status(200).render('auth/login', {
            title: 'Login'
        })
    },

    RenderRegister(req, res) {
        res.status(200).render('auth/register', {
            title: 'Register'
        })
    }
}