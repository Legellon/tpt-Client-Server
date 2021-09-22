const express = require('express')
const dashboard = require('../controllers/dashboard.js')
const { requireAuth } = require('./../controllers/auth.js')

const router = express.Router();

router.get('/', (req, res) => {
    res.redirect('/login') })

router.get('/login', (req, res) => {
    res.render('login') })

router.get('/register', (req, res) => {
    res.render('register') })

router.get('/dashboard', requireAuth, (req, res) => {
    res.render('dashboard') 
})

module.exports = router