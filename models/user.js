const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        unique: false,
        trim: true
    },

    lastName: {
        type: String,
        required: [true, "Last Name is required"],
        unique: false,
        trim: true,
        minlength: [3, "Last Name can't be shorter than 3 characters"],
        maxlength: [30, "Last Name can't be longer than 30 characters"],
    },

    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 8
    },

    pwd:{
        type: String,
        required: true,
        minlength: 8  
    },

    pwdRepeat:{
        type: String,
        required: false,
        minlength: 8
    },

    mobileNumber: {
        type: Number,
        required: true,
        min: 8
    },

    status: {
        type: String,
        unique: false,
    },

    walletBalance: {
        type: Number,
        unique: false,
    },

    registrationDate: {
        type: Date,
        unique: false,
    },

    numberOfReferals: {
        type: Number,
        unique: false,
    },

    availablePoints: {
        type: Number,
        unique: false,
    },

    totalPoints: {
        type: Number,
        unique: false,
    }

})

const user = mongoose.model('user', userSchema);

module.exports = user;

//module.exports = mongoose.model('Users', userSchema);