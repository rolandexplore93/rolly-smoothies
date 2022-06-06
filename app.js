const express = require('express');
const mongoose = require('mongoose');

// Configure the environment variable to hide api keys from public
const dotenv = require('dotenv');
dotenv.config();

// Instantiate an app 
const app = express()

// apply middleware
app.use(express.static('public'))

// ejs view engine
app.set('view engine', 'ejs')

// connect to database
const databaseAPI = `${process.env.API_KEY}`
mongoose.connect(databaseAPI)
    .then(result => app.listen(`${process.env.PORT}`, () => {
        console.log(`App listening on port ${process.env.PORT}`)
    }))
    .catch(err => console.log(err));

// routes
app.get('/', (req, res) => {res.render('home', { title: "Smoothies"})})
app.get('/smoothies', (req, res) => {res.render('smoothies')})
