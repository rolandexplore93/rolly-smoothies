const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const cookieParser = require('cookie-parser')
const { requireAuth, checkUser } = require('./middleware/authMiddleware');
// Configure the environment variable to hide api keys from public
const dotenv = require('dotenv');
dotenv.config();

// Instantiate an app 
const app = express()

// apply middleware
app.use(express.static('public'))
app.use(express.json())
app.use(cookieParser())

// ejs view engine
app.set('view engine', 'ejs');

// connect to database
const databaseAPI = `${process.env.API_KEY}`;
mongoose.connect(databaseAPI)
    .then(result => app.listen(`${process.env.PORT}`, () => {
        console.log(`App listening on port ${process.env.PORT}`)
    }))
    .catch(err => console.log(err));

// routes
app.get('*', checkUser)  //apply MW to every single get request
app.get('/', (req, res) => {res.render('home', { title: "Smoothies"})})
app.get('/smoothies', requireAuth, (req, res) => {res.render('smoothies')})
app.use('/', authRoutes);

// cookies
// app.get('/set-cookies', (req, res) => {
//     // Basic approach to set cookies
//     // res.setHeader('Set-Cookie', 'newUser: true');
//     // res.send("Cookie received")

//     // Using a 3rd party package cookie-parser
//     res.cookie('newUser', false);
//     res.cookie('isEmployee', true, {
//         maxAge: 1000 * 60 * 60 * 24,
//         httpOnly: true 
//      })

//     res.send("Cookie received");
// })

// app.get('/read-cookies', (req, res) => {
//     const cookies = req.cookies
//     console.log(cookies)

//     res.json(cookies)
// })
