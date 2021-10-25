const express = require('express')
const Dashboard = require('../controllers/dashboard')
const { RequireAuth } = require('./../middleware/auth')

const router = express.Router()

router.use(RequireAuth)

router.get('/', Dashboard.Render)
router.post('/submit', Dashboard.Submit)

module.exports = router 