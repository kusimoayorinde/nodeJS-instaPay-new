require('dotenv').config(); 
const express = require('express');
const mongoose = require('mongoose');
const user = require('../models/user');
const bcrypt = require('bcrypt');
//const session = require('express-session')

//const cookieParser = require('cookie-parser')

56
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
    //The constant message is just a dummy
    //to differentiate when a particular
    //message will be displayed in the firstLogin.ejs page
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
                    res.router.set('firstName', user.firstName)
                    res.locals.lastName = user.lastName
                    res.redirect("/home")
                  }else{
                    //constant message is a dummy figure used in
                    // making display decision on firstLogin.ejs
                    const message = 9;
                    const alert = 'It is either the email, password, ' +
                                    'and/or OTP you provided is wrong.' +
                                    ' If you can no longer remember your' +
                                    'password, click FORGOT PASSWORD.' +
                                    ' If OTP is not received, click on' +
                                    ' RESEND OTP to have OTP sent again.'
                    res.render('firstLogin.ejs', { alert, message })
                    
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