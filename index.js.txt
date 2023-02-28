const express = require('express')
const app = express()
const path = require('path');
const port = 3000

// gives access to static files (html, css, js)
app.use(express.static('static'))


// --PAGES--

// home page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/static/index.html'))
})

// redirect home page
app.get('/index', (req, res) => {
    res.redirect('/')
})

// youtube page
app.get('/youtube', (req, res) => {
    res.sendFile(path.join(__dirname, '/static/youtube.html'))
})

// redutils page
app.get('/redutils', (req, res) => {
    res.sendFile(path.join(__dirname, '/static/redutils.html'))
})

// marble mania page
app.get('/marble-mania', (req, res) => {
    res.sendFile(path.join(__dirname, '/static/marble-mania.html'))
})


// starts server
app.listen(port, () => {
    console.log(`Website started on ${port}`)
})