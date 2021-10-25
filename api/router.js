const express = require('express')
const API = require('./controller')

const router = express.Router()

router.use(express.json())

router.get('/categories', API.getCategories)
router.get('/dashboards', API.getDashboards)
router.post('/submit', API.postDashboard)

router.get('/login', API.Login)
router.get('/verify', API.VerifyToken)
router.post('/register', API.AddNewUser)

module.exports = router