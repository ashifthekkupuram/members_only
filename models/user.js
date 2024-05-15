const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    firstName: {
        type: String,
        minLength: 3
    },
    secondName: {
        type: String,
        minLength: 3
    },
    membershipStatus: {
        type: Boolean,
        default: false
    },
    admin: {
        type: Boolean,
        default: true
    },
    password: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('User', UserSchema)