const http = require('http')

module.exports = {
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
    }
}