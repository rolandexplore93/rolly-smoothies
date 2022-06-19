const jwt =  require('jsonwebtoken');
const User = require('../models/User');

const requireAuth = (req, res, next) => {
    // grab the token from the cookie
    const token = req.cookies.jwt
    // check if the token exists
    if (token){
        // verify the token
        jwt.verify(token, "rollyJS secret", (err, decoded) => {
            if (err){
                console.log(err.message);
                res.redirect('/')
            } else {
                console.log(decoded);
                next()
            }
        })
    } else {
        res.redirect('/login')
    }
}

// check current user
const checkUser = (req, res, next) => {
    // grab the token from the cookie
    const token = req.cookies.jwt
    // check if the token exists
    if (token){
        // verify the token
        jwt.verify(token, "rollyJS secret", async (err, decodedToken) => {
            if (err){
                console.log(err.message);
                res.locals.user = null;
                next();
            } else {
                console.log(decodedToken);
                let user = await User.findById(decodedToken.id);
                res.locals.user = user;
                next();
            }
        })
    } else {
        res.locals.user = null;
    }
}

module.exports = { requireAuth, checkUser }