const mongoose = require('mongoose');
const user = require('../models/user');
const express = require('express');
const nodemailer = require('nodemailer');
const crypto = require('crypto');

//To load environment variables from a .env file into process.env
const dotenv = require('dotenv');
dotenv.config();

// Creating express Router
const router=express.Router()

//body parser allows access to req.body
//app.use(express.json());
//app.use(express.urlencoded({ extended: true }));

const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({extended: true}))

//Connection to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/instaPay')
    .then(() => {
        console.log("RESET ROUTE CONNECTED TO MONGODB")
    })
    .catch(err => {
        console.log("CONNECTION ERROR!!!!")
        console.log(err)
    })



router.get('/reset', (req, res) => {
    res.render("reset.ejs");
})


const reset = router.post('/reset', (req, res) => {
    console.log(req.body.email)

    user.findOne({email: req.body.email}).then(user => {
        if(user){

            //Generate OTP
            function generateOTP() {
                //userMail was declared here so that
                //it can be exportable
                //It seems only the variables
                //in this function works with export.modules
                userMail = req.body.email;

                otp = crypto.randomInt(100000, 999999);
            }
            generateOTP()

             //Send OTP creation email alert
            var smtpTransport = nodemailer.createTransport({
            service: process.env.MAIL_SERVICE,
            auth: {
                user: "kusimoayorinde@gmail.com",
                pass: process.env.PASS
                }
            });
                            
            var mailOptions = {
                to: req.body.email,
                from: 'instaregistration@instapay.com',
                subject: 'Password Reset',
                text: 'Hello,\n\n' +
                    'Your OTP is: ' + otp
            };
                          
            smtpTransport.sendMail(mailOptions, function(error) {
                if (error) {
                    console.log(error);
                } else {
                    console.log('OTP email alert sent');
                    res.redirect('/reset2')
                }
                                            
            });

        }else{
            res.send('EMAIL NOT IN DATABASE')
        }
    })

})


//Exporting the route
module.exports=router;
module.exports=reset;