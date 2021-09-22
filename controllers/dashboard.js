const db = require('../models/db.js')

const categories = () => {
    return db.query(`SELECT * FROM categories`)
}

const dashboards = () => {
    return db.query(`SELECT name,email,category,note FROM dashboards INNER JOIN categories USING (categoryID)`)
}

function submit(req, res) {
    const { email, fullname, category, note} = req.body
    db.query(
        `INSERT IGNORE INTO dashboards (name,email,categoryID,note) VALUES('${fullname}','${email}','${category}','${note}')`
    )
    res.redirect('/dashboard')
}

function render(req, res) {
    res.render('dashboard')
}

module.exports = {
    submit,
    render
}