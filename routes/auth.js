const express = require('express')
const Auth = require('../controllers/auth')

const router = express.Router()

router.get('/', Auth.RenderLogin)
router.get('/register', Auth.RenderRegister)

router.post('/register', Auth.Register)
router.post('/login', Auth.Login)

module.exports = router