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
            http.get(`http://localhost:3000/api/login?password=${password}`, (res) => {
                res.on('data', chunk => {
                    return resolve(JSON.parse(chunk))
                })
            })
        })

        if(loginRequest.loggedIn) {
            res.cookie('jwt', loginRequest.token, {httpOnly: true, maxAge: 60})
            res.status(200).redirect('/dashboard')
        } else {
            res.status(403)
        }
    },

    async RequireAuth(req, res, next) {
        const { jwt } = req.cookies;

        const verifyRequest = await new Promise(resolve => {
            http.get(`http://localhost:3000/api/verify?token=${jwt}`, res => {
                res.on('data', chunk => {
                    return resolve(JSON.parse(chunk))
                })
            })
        })

        if(verifyRequest.loggedIn) {
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