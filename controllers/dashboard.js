const http = require('http')

module.exports = {
    async Submit(req, res) {
        const {fullname, email, category, note} = req.body
    
        const data = JSON.stringify({
            fullname: fullname,
            email: email,
            category: category,
            note: note
        })
    
        const options = {
            protocol: 'http:',
            hostname: 'localhost',
            port: 3000,
            path: '/api/submit',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': data.length
            }
        }

        //.post("http://localhost:3000/api/submit")
        const request = http.request(options)
        request.write(data)
        request.end()
    
        res.status(200).redirect('back')
    },

    async Render(req, res) {
        const categories = await new Promise(resolve => {
            http.get("http://localhost:3000/api/categories", (res) => {
                res.on('data', (chunk) => {
                    return resolve(JSON.parse(chunk))
                })
            })
        })
    
        const dashboards = await new Promise(resolve => {
            http.get("http://localhost:3000/api/dashboards", (res) => {
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