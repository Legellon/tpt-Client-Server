const connection = require('../models/db')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

module.exports = {
    async getCategories(req, res) {
        res.status(200).json(await new Promise((resolve) => {
            connection.execute(`SELECT * FROM categories`, (err, res) => {
                return resolve(res)
            })
        }))
    },

    async getDashboards(req, res) {
        res.status(200).json(await new Promise((resolve) => {
            connection.execute(`SELECT dashboardID,name,email,category,note FROM dashboards INNER JOIN categories USING (categoryID)`, (err, res) => {
                return resolve(res)
            })
        }))
    },

    async postUser(req, res) {
        const { password } = req.body
        const hash = await bcrypt.hash(password, 10)
        connection.execute(`INSERT INTO users (userID, role, password) VALUES (NULL, 'admin', '${hash}')`)
        res.status(200)
    },

    async login(req, res) {
        const { password } = req.body
        const storedPassword = await new Promise((resolve) => {
            connection.execute(`SELECT password,userID FROM users`, (err, res) => {
                
            })
        })
    },

    postDashboard(req, res) {
        const {fullname, email, category, note} = req.body
        connection.execute(`INSERT IGNORE INTO dashboards (name,email,categoryID,note) VALUES('${fullname}','${email}','${category}','${note}')`)
        res.status(200)
    }
}