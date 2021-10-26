const http = require('http')
const config = require('../config')

const { SERVER_PORT } = config

module.exports = {
    async RequireAuth(req, res, next) {
        const { jwt } = req.cookies;

        const verifyRequest = await new Promise(resolve => {
            http.get(`http://localhost:${SERVER_PORT}/api/verify?token=${jwt}`, res => {
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
    }
}