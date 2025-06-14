const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 8
    },

    pwd: {
        type: String,
        required: true,
        minlength: 8  
    },

    confirmPwd: {
        type: String,
        required: true,
        minlength: 8  
    },

    otp: {
        type: Number,
        required: true,
        min: 6
    }

})

const resetter = mongoose.model('user', userSchema);
module.exports = resetter;

//module.exports = mongoose.model('user', userSchema);