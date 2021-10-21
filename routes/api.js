const express = require('express')
const API = require('../controllers/API')

const router = express.Router()

router.get('/categories', API.getCategories)
router.get('/dashboards', API.getDashboards)
router.post('/submit', API.postDashboard)
router.post('/registration', API.postUser)
router.post('/login', API.login)

module.exports = router