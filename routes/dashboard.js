const express = require('express')
const Dashboard = require('../controllers/dashboard.js')
const { RequireAuth } = require('./../controllers/auth.js')

const router = express.Router()

router.use(RequireAuth)

router.get('/', Dashboard.Render)
router.post('/submit', Dashboard.Submit)

module.exports = router 