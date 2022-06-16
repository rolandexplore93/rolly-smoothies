// import user model
const User = require("../models/User")

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

module.exports.signup_get = (req, res) => {
    res.render('signup')
}

module.exports.login_get = (req, res) => {
    res.render('login')
}

module.exports.signup_post = async (req, res) => {
    const {email, password} = req.body;
    // console.log(email, password, username)
    // res.send('A new user signup')
    try {
        const user = await User.create({ email, password });
        res.status(201).json(user); 
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