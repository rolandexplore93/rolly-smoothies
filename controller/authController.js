// import user model
const User = require("../models/User")
const jwt = require("jsonwebtoken")

// handle errors
const handleErrors = (err => {
    console.log(err.message, err.code);
    let errors = { email: '', password: ''}

    // duplicate error code
    if (err.code === 11000){
        errors.email = "Email already exist in our database";
        return errors
    }

    // errors validation
    if (err.message.includes('user validation failed')){
        console.log(Object.values(err.errors).forEach(({properties}) => {
            // console.log(properties)
            // access the error object and decide which value to update
            errors[properties.path] = properties.message
        }))
    }

    return errors
})

const maxAge = 3 * 24 * 60 * 60; //jwt expect time in seconds

const createToken = (id) => {
    // create jwt and return it
    return jwt.sign({ id }, 'rollyJS secret', {
        expiresIn: maxAge
    })
}

module.exports.signup_get = (req, res) => {
    res.render('signup')
}

module.exports.login_get = (req, res) => {
    res.render('login')
}

module.exports.signup_post = async (req, res) => {
    const {email, password} = req.body;
    // res.send('A new user signup')
    try {
        const user = await User.create({ email, password });
        // create a jwt that will be sent back to the browser
        const token = createToken(user._id);
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000})
        res.status(201).json({user: user._id}); 
        console.log(user)
    }
    catch(err){
        const error = handleErrors(err)
        // res.status(400).send("Error occurred! Please, check if your details are correct")
        res.status(400).json({ error }) 

    }
}

module.exports.login_post = async (req, res) => {
    const {email, password} = req.body;
    console.log(email, password)
    res.send('user sign in')
}