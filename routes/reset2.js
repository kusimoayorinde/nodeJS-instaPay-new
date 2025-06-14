const mongoose = require('mongoose');
const user = require('../models/user');
const express = require('express');
const nodemailer = require('nodemailer');
const reset = require('./reset');
const bcrypt = require('bcrypt');

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
        console.log("RESET2 ROUTE CONNECTED TO MONGODB")
    })
    .catch(err => {
        console.log("CONNECTION ERROR!!!!")
        console.log(err)
    })



router.get('/reset2', (req, res) => {
    res.render("reset2.ejs");
})


router.post('/reset2', (req, res) => {
    console.log(userMail)
    console.log(req.body.pwd)
    console.log(req.body.otp)
    console.log(otp)

    if(req.body.otp == otp){
        bcrypt.genSalt(12, async function(err, salt) {
            bcrypt.hash(req.body.pwd, salt, async (err, hash) =>{
                if(err) res.send(err);
                req.body.pwd = hash;
                console.log(req.body.pwd)
                user.updateOne({email: userMail}, {$set: {pwd: req.body.pwd}})
                .then(() => {
                    res.redirect('/')
                })
                .catch((error) => {
                    res.render(error)
                });
            });
        });

    }else{
        res.send('err');
    }
})


//Exporting the route
module.exports=router;
