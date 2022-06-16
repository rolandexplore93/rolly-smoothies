// import user model
const User = require("../models/User")

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
        console.log(err);
        res.status(400).send("Error occurred! Please, check if your details are correct")
    }
}

module.exports.login_post = async (req, res) => {
    const {email, password} = req.body;
    console.log(email, password)
    res.send('user sign in')
}