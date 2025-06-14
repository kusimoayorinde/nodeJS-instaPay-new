const mongoose = require('mongoose');
const user = require('../models/user');
const express = require('express');
const me = require('./otp');




//To load environment variables from a .env file into process.env
const dotenv = require('dotenv');
dotenv.config();

// Creating express Router
const router=express.Router()

//body parser allows access to req.body
const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({extended: true}))

//Connection to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/instaPay')
    .then(() => {
        console.log("OTP2 ROUTE CONNECTED TO MONGODB")
    })
    .catch(err => {
        console.log("CONNECTION ERROR!!!!")
        console.log(err)
    })


router.get('/otp2', (req, res) => {
    res.render("otp2.ejs");
})


router.post('/otp2', (req, res) => {
    console.log(otp);
    console.log(req.body.otp)
    console.log(userMail)
    if(req.body.otp == otp){
        user.updateOne({email: userMail}, {$set: {status: "active"}}, {upsert: false}, function(err,doc) {
            if(err){ throw err;}
            else {console.log("Account status successfully updated")}
        }).then(() => {
            res.redirect('/')
        })
        
    }else{
        res.send(err);
    }
    
})



//Exporting the route
module.exports=router