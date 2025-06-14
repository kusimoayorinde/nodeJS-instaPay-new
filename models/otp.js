const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 8
    }

})

const user = mongoose.model('user', userSchema);

module.exports = otp;

//module.exports = mongoose.model('Users', userSchema);