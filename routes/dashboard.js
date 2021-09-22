const express = require('express')
const dashboardController = require('../controllers/dashboard.js')
const { requireAuth } = require('./../controllers/auth.js')

const router = express.Router()

router.get('/', requireAuth, dashboardController.render)
router.post('/submit', dashboardController.submit)

module.exports = router