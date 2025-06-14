require('dotenv').config(); 
const express = require('express');
const mongoose = require('mongoose');
const user = require('../models/user');
const bcrypt = require('bcrypt');
//const session = require('express-session')

//const cookieParser = require('cookie-parser')


// Creating express Router
const router=express.Router()



//body parser allows access to req.body
const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({extended: true}))

//Middleware for Connect-Flash


//Connection to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/instaPay')
    .then(() => {
        console.log("CONNECTED TO MONGODB")
    })
    .catch(err => {
        console.log("CONNECTION ERROR!!!!")
        console.log(err)
    })


//Render Login Page
router.get('/firstLogin', (req, res) => {
    const message = 10
    res.render("firstLogin.ejs", { message })
})


//User Login
router.post('/firstLogin', (req, res)=>{
   user.findOne({email: req.body.email}).then(user=>{
       if(user){
           bcrypt.compare(req.body.pwd, user.pwd, (err, matched)=>{
               if(err) return err;
                  if(matched && (user.otp == req.body.otp)){
                    //user.updateOne({email: req.body.email}, { $unset: { otp: 1 }});
                    user.updateOne({email: req.body.email}, {$set: {status: 'active'}});
                    user.save()
                    //Ensure the DB changes were successful
                    //and saved before proceeding
                    const firstName = user.firstName
                    const lastName = user.lastName
                    res.render("home.ejs", { firstName, lastName })
                  }else{
                    console.log('flash');
                    const alert = 'It is either the email, password' +
                                    'and/or OTP you provided is wrong.' +
                                    'If you can no longer remember your' +
                                    'password, click FORGOT PASSWORD.' +
                                    'Click on RESEND OTP to have it sent again.'
                    const message = req.flash(alert)
                    //req.flash('message', "Hurray")
                    res.render('firstLogin.ejs', { message, alert })
                    
                     //res.send('USER LOGIN NOT SUCCESSFUL\n\n' +
                        //'EITHER THE PASSWORD OR OTP IS WRONG'
                     //)
                  }
               });
       }
   });

})

//Exporting the route
module.exports=router