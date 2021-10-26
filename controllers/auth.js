const http = require('http')
const config = require('../config')

const { SERVER_PORT } = config

module.exports = {
    async Register(req, res) {
        const { password } = req.body

        const data = JSON.stringify({
            password: password
        })

        const options = {
            protocol: 'http:',
            hostname: 'localhost',
            port: SERVER_PORT,
            path: '/api/register',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': data.length
            }
        }

        const registerRequest = http.request(options)
        registerRequest.write(data)
        registerRequest.end

        res.status(200).redirect('/auth')
    },

    async Login(req, res) {
        const { password } = req.body

        const loginRequest = await new Promise(resolve => {
            http.get(`http://localhost:${SERVER_PORT}/api/login?password=${password}`, (res) => {
                res.on('data', chunk => {
                    return resolve(JSON.parse(chunk))
                })
            })
        })

        if(loginRequest.loggedIn) {
            res.cookie('jwt', loginRequest.token, {httpOnly: true, maxAge: 1000 * 60})
            res.status(200).redirect('/dashboard')
        } else {
            res.status(403).redirect('back')
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