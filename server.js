const express = require('express')
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const app = express()
const path = require('path');
const port = process.env.PORT || 8080;

// gives access to static files (html, css, js)
app.use(express.static('static'))
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));



// --PAGES--

// home page
app.get('/', (req, res) => {
    res.render("pages/home")
})

// about page
app.get('/about', (req, res) => {
    res.render("pages/about")
})

// redirect home page
app.get('/index', (req, res) => {
    res.redirect('/')
})

// redirect home page
app.get('/home', (req, res) => {
    res.redirect('/')
})

app.get('/contact', (req, res) => {
    res.render("pages/contact")
})

app.post('/contact', (req, res) => {
    const { name, email, message } = req.body;
  
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'elliotkeasbeyclark@gmail.com',
        pass: 'qtglxqeyyoboeoja'
      }
    });
  
    const mailOptions = {
      from: email,
      to: 'elliotkeasbeyclark@gmail.com',
      subject: `New message from ${name}`,
      text: `${name} (${email}) says: ${message}`
    };
  
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error);
        res.render("pages/contact");
      } else {
        console.log('Message sent:', info.response);
        res.render("pages/contact");
      }
    });
  });

// youtube page
app.get('/youtube', (req, res) => {
    res.render("pages/youtube")
    // res.sendFile(path.join(__dirname, '/static/youtube.html'))
})

// --GAMES--

// games page
app.get('/games', (req, res) => {
    res.render("pages/games")
})

// marble mania page
app.get('/marblemania', (req, res) => {
    res.render("pages/marblemania")
})

// dodgeblob page
app.get('/dodgeblob', (req, res) => {
    res.render("pages/dodgeblob")
})

// beast hunter page
app.get('/beasthunter', (req, res) => {
    res.render("pages/beasthunter")
})

// BALLoon page
app.get('/balloon', (req, res) => {
    res.render("pages/balloon")
})

// magnet to a gunfight page
app.get('/magnettoagunfight', (req, res) => {
    res.render("pages/magnettoagunfight")
})

// death in strange places page
app.get('/deathinstrangeplaces', (req, res) => {
    res.render("pages/deathinstrangeplaces")
})

// --RLBOT--

// rlbot page
app.get('/rlbot', (req, res) => {
    res.render("pages/rlbot")
})

// redutils page
app.get('/redutils', (req, res) => {
    res.render("pages/redutils")
})

// rivals page
app.get('/rivals', (req, res) => {
    res.render("pages/rivals")
})

// molten page
app.get('/molten', (req, res) => {
    res.render("pages/molten")
})

// broccolibot page
app.get('/broccolibot', (req, res) => {
    res.render("pages/broccolibot")
})





// starts server
app.listen(port, () => {
    console.log(`Website started at port ${port}`)
})