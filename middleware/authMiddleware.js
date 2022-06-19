const jwt =  require('jsonwebtoken');

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

module.exports = { requireAuth }