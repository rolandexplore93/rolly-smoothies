const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new Schema({
    email: {
        type: String,
        required: [true, 'Please enter your email'],
        unique: true,
        lowercase: true,
        validate: [isEmail, 'Please enter a valid email address']
    },
    password: {
        type: String,
        required: [true, 'Password cannot be empty'],
        minlength: [6, 'Minimum password length is 6 characters']
    }
}, { timestamps: true })

// fire a function after a document has been saved to the database
// Test with POSTMAN
// userSchema.post('save', function(doc, next){
//     console.log("New user saved to the database");
//     next()
// })

// fire a function before a document is save to the database
userSchema.pre('save', async function(next){
    // console.log("User is about to be created and saved to the database", this);
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
})

// create a static method to login user
userSchema.statics.login = async function(email, password){
    // check if the email exist in the database
    const user = await this.findOne({email});
    // console.log(user)
    //check if there is a user in case email exist in database; otherwise, you get undefined as a response 
    if (user){
        const auth = await bcrypt.compare(password, user.password)
        if (auth){ 
            return user 
        }
        throw Error('Password is not correct')
    }
    throw Error('Email not found! Please, sign up')
}

// Create a user model based on the schema
const User = mongoose.model('user', userSchema)

module.exports = User