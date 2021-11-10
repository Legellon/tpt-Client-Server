const http = require('http')
const config = require('../../settings/config')

const { SERVER_PORT } = config.api

module.exports = {
    async RequireAuth(req, res, next) {
        const { jwt } = req.cookies;

        const verifyResponse = await new Promise(resolve => {
            http.get(`http://localhost:${SERVER_PORT}/api/verify?token=${jwt}`, res => {
                res.on('data', chunk => {
                    return resolve(JSON.parse(chunk))
                })
            })
        })

        if(verifyResponse.loggedIn) {
            next()
        } else {
            res.status(403).redirect('/auth');
        }
    }
}