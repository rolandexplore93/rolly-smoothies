const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { isEmail } = require('validator')

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
userSchema.pre('save', function(next){
    console.log("User is about to be created and saved to the database", this);
    next()
})


// Create a user model based on the schema
const User = mongoose.model('user', userSchema)

module.exports = User