const mongoose = require('mongoose');
const user = require('../models/user');
const express = require('express');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');

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
        console.log("CONNECTED TO MONGODB")
    })
    .catch(err => {
        console.log("CONNECTION ERROR!!!!")
        console.log(err)
    })

//Registration Page
router.get('/register', (req, res) => {
    console.log("wow")
    res.render("register.ejs")
})


//Posting Registration Data
router.post('/register2', async (req, res, next) => {
    console.log('Accessing the secret section ...')

    next() // pass control to the next handler
}, (req, res) => {

    const newUser = new user();
    
    newUser.firstName = req.body.firstName;
    newUser.lastName = req.body.lastName;
    newUser.mobileNumber = req.body.mobileNumber;
    newUser.email = req.body.email;
    newUser.pwd = req.body.pwd;

    bcrypt.genSalt(12, function(err, salt) {
        bcrypt.hash(newUser.pwd, salt, (err, hash) =>{
            if(err) res.send(err);

            newUser.pwd = hash;
            // Store hash in your password DB.
            newUser.save().then(() => {
                res.render('login.ejs')

                //Send account creation email alert
                var smtpTransport = nodemailer.createTransport({
                service: process.env.MAIL_SERVICE,
                auth: {
                    user: process.env.USER,
                    pass: process.env.PASS
                    }
                });
                
                var mailOptions = {
                    to: req.body.email,
                    from: 'instaregistration@instapay.com',
                    subject: 'Your InstaPay account has been created',
                    text: 'Hello,\n\n' +
                        'This is a confirmation that your InstaPay account has been successfully created. '
                };
              
                smtpTransport.sendMail(mailOptions, function(error) {
                    if (error) {
                        console.log(error);
                    } else {
                        console.log('Account creation email alert sent');
                    }
                                
                });
                //Send account creation (user registration) success message
                //res.send(`Registration was successful`);

            }).catch(err=>{
                res.send('Registration was not successful because...' + err)
            })
        });
    });


});
              

//Exporting the route
module.exports=router
