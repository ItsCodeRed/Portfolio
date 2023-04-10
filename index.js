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

// redirect home page
app.get('/home', (req, res) => {
    res.redirect('/')
})

// youtube page
app.get('/youtube', (req, res) => {
    res.sendFile(path.join(__dirname, '/static/youtube.html'))
})

// --GAMES--

// games page
app.get('/games', (req, res) => {
    res.sendFile(path.join(__dirname, '/static/games.html'))
})

// marble mania page
app.get('/marblemania', (req, res) => {
    res.sendFile(path.join(__dirname, '/static/marblemania.html'))
})

// dodgeblob page
app.get('/dodgeblob', (req, res) => {
    res.sendFile(path.join(__dirname, '/static/dodgeblob.html'))
})

// beast hunter page
app.get('/beasthunter', (req, res) => {
    res.sendFile(path.join(__dirname, '/static/beasthunter.html'))
})

// BALLoon page
app.get('/balloon', (req, res) => {
    res.sendFile(path.join(__dirname, '/static/balloon.html'))
})

// magnet to a gunfight page
app.get('/magnettoagunfight', (req, res) => {
    res.sendFile(path.join(__dirname, '/static/magnettoagunfight.html'))
})

// death in strange places page
app.get('/deathinstrangeplaces', (req, res) => {
    res.sendFile(path.join(__dirname, '/static/deathinstrangeplaces.html'))
})

// --RLBOT--

// rlbot page
app.get('/rlbot', (req, res) => {
    res.sendFile(path.join(__dirname, '/static/rlbot.html'))
})

// redutils page
app.get('/redutils', (req, res) => {
    res.sendFile(path.join(__dirname, '/static/redutils.html'))
})

// rivals page
app.get('/rivals', (req, res) => {
    res.sendFile(path.join(__dirname, '/static/rivals.html'))
})

// molten page
app.get('/molten', (req, res) => {
    res.sendFile(path.join(__dirname, '/static/molten.html'))
})

// broccolibot page
app.get('/broccolibot', (req, res) => {
    res.sendFile(path.join(__dirname, '/static/broccolibot.html'))
})





// starts server
app.listen(port, () => {
    console.log(`Website started at localhost:${port}`)
})