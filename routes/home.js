const express = require('express');
const mongoose = require('mongoose');
const user = require('../models/user');

// Creating express Router
const router=express.Router()

//Connection to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/instaPay')
    .then(() => {
        console.log("HOME/DASHBOARD ROUTE CONNECTED TO MONGODB")
    })
    .catch(err => {
        console.log("CONNECTION ERROR!!!!")
        console.log(err)
    })

const home = router.get('/home', (req, res) => {
    user.findOne({email: email}).then(user=>{
        try {
            registrationDate = user.registrationDate
            walletBalance = user.walletBalance  
            availablePoints = user.availablePoints
            totalPoints = user.totalPoints
            res.render('home.ejs', { firstName, lastName, email, registrationDate, 
                availablePoints, totalPoints, walletBalance })
            
        }catch(err){
            console.log(err)
        }
    });
})

//Exporting the route
module.exports=router
