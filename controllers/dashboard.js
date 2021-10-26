const http = require('http')
const config = require('../config/config')

const { SERVER_PORT } = config.defaults

module.exports = {
    async Submit(req, res) {
        const { fullname, email, category, note } = req.body
    
        const data = JSON.stringify({
            fullname: fullname,
            email: email,
            category: category,
            note: note
        })
    
        const options = {
            protocol: 'http:',
            hostname: 'localhost',
            port: SERVER_PORT,
            path: '/api/submit',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': data.length
            }
        }

        const request = http.request(options)
        request.write(data)
        request.end()
    
        res.status(200).redirect('back')
    },

    async Render(req, res) {
        const categories = await new Promise(resolve => {
            http.get(`http://localhost:${SERVER_PORT}/api/categories`, (res) => {
                res.on('data', (chunk) => {
                    return resolve(JSON.parse(chunk))
                })
            })
        })
    
        const dashboards = await new Promise(resolve => {
            http.get(`http://localhost:${SERVER_PORT}/api/dashboards`, (res) => {
                res.on('data', (chunk) => {
                    return resolve(JSON.parse(chunk))
                })
            })
        })

        res.status(200).render('dashboard', {
            title: 'Dashboard',
            categories: categories,
            dashboards: dashboards
        })
    }
}