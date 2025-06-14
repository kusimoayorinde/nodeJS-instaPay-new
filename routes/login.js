require('dotenv').config(); 
const express = require('express');
const mongoose = require('mongoose');
const user = require('../models/user');
const bcrypt = require('bcrypt');

// Creating express Router
const router=express.Router()

//body parser allows access to req.body
const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({extended: true}))

//Connection to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/instaPay')
    .then(() => {
        console.log("LOGIN ROUTE CONNECTED TO MONGODB")
    })
    .catch(err => {
        console.log("CONNECTION ERROR!!!!")
        console.log(err)
    })


//Render Login Page
router.get('/', (req, res) => {
   res.render("login.ejs")
})


//User Login
const welcome = router.post('/login', (req, res)=>{
    
   console.log(req.body.email)
   user.findOne({email: req.body.email}).then(user=>{
      
      if(user){

         // firstName, lastName, and email was declared here for
         //the purpose of exporting it to the home
         // page (dashboard)
         firstName = user.firstName
         lastName = user.lastName
         email = req.body.email

         bcrypt.compare(req.body.pwd, user.pwd, (err, matched)=>{
            if(err) return err;
            if(matched && (user.status == 'active')){
               res.redirect("/home")
            }else{
               console.log('EMAIL OR PASSWORD IS WRONG ' +
                  'OR ACCOUNT NOT YET ACTIVE DUE TO EMAIL ' +
                  'NOT BEING VERIFIED')
                  res.redirect("/")
            }


         });
      }else{
         console.log("USER NOT FOUND OR PASSWORD IS WRONG " +
             "OR ACCOUNT IS NOT YET ACTIVE DUE TO EMAIL NOT BEING VERIFIED")
         res.redirect("/")
      }  
   });

})

//Exporting the route
module.exports=router

// This module was exported so as to be able to reference
//firstName and lastName in the home page (dashboard)
module.exports=welcome