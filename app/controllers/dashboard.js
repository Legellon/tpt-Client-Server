const http = require('http')
const config = require('../../settings/config')

const { SERVER_PORT } = config.api

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

        const submitRequest = http.request(options)
        submitRequest.write(data)
        submitRequest.end()
    
        res.status(200).redirect('back')
    },

    async Render(req, res) {
        const getCategoriesResponse = await new Promise(resolve => {
            http.get(`http://localhost:${SERVER_PORT}/api/categories`, (res) => {
                res.on('data', (chunk) => {
                    return resolve(JSON.parse(chunk))
                })
            })
        })
    
        const getDashboardsResponse = await new Promise(resolve => {
            http.get(`http://localhost:${SERVER_PORT}/api/dashboards`, (res) => {
                res.on('data', (chunk) => {
                    return resolve(JSON.parse(chunk))
                })
            })
        })

        res.status(200).render('dashboard', {
            title: 'Dashboard',
            categories: getCategoriesResponse,
            dashboards: getDashboardsResponse
        })
    }
}