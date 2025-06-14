const express = require('express');
const mongoose = require('mongoose');
//const user = require('../models/user');//Connection to MongoDB



mongoose.connect('mongodb://127.0.0.1:27017/farmStand')
    .then(() => {
        console.log("CONNECTED TO MONGODB")
    })
    .catch(err => {
        console.log("CONNECTION ERROR!!!!")
        console.log(err)
    })

    db.users.updateOne({email: 'kusimoayorinde@gmail.com'}, {$set: {status: 'active'}});
