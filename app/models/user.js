const { Schema, model } = require('mongoose')

const UserSchema = Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    img: {
        type: String,
    },
    role: {
        type: String,
        required: true,
        default: 'ROLE_USER',
        enum: ['ROLE_USER', 'ROLE_ADMIN'],
    },
    active: {
        type: Boolean,
        default: true,
    },
    google: {
        type: Boolean,
        default: false,
    }
})

UserSchema.methods, toJSON = function () {
    const { __v, password, ...user } = this.toObject()
    return user
}


module.exports = model('users', UserSchema)