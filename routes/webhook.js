const express = require('express');
const crypto = require('crypto');
const user = require('../models/user');

// Creating express Router
const router=express.Router()

//Express now has a built in parser, so bodyParser dependency
//is no longer required.
router.use(express.json());
//router.use(express.urlencoded({ extended: true }));

//body parser allows access to req.body
//const bodyParser = require('body-parser');
//router.use(bodyParser.json())


//To load environment variables from a .env file into process.env
const dotenv = require('dotenv');
dotenv.config();

//const secret = process.env.SECRET_KEY;
const secret = "sk_test_2807786a573f55bd6ba23d17534b28900cfd32c8";

// Using Express
router.post("/webhook", (req, res) => {
    console.log("Webhook received");

    //validate event
    const hash = crypto.createHmac('sha512', secret).update(JSON.stringify(req.body)).digest('hex');
    
    if (hash == req.headers['x-paystack-signature']) {
        // Retrieve the request's body
        const event = req.body;
        console.log(event)

        //console.log(req.body.event);
        //console.log(req.body.data.status)
        //console.log(req.body.data.customer.email)

        res.sendStatus(200);

        if (event.event == 'charge.success' && event.data.status == 'success') {
            // Handle the successful payment here
            console.log("Payment successful for event:", event.data.reference);
            // You can update your database or perform other actions here
            user.findOne({email: event.data.customer.email}).then(user => {
                if (user) {
                    // Update user payment status or perform any other action
                    user.walletBalance += event.data.amount / 100; // Assuming amount is in kobo
                    user.save().then(() => {
                        console.log("User wallet updated successfully for email:", event.data.customer.email);
                        //res.sendStatus(200); // Respond with success
                        //Details should be logged to success file for monitoring
                    }).catch(err => {
                        console.error("Error updating user wallet:", err);
                        //res.sendStatus(500); // Respond with error
                        // Details should be logged to error file for further analysis
                    });
                } else {
                    console.log("User not found for email:", event.data.customer.email);
                    //Details should be logged to error file for further analysis
                }
            }).catch(err => {
                console.error("Error finding user:", err);
            });

        } else {
            // Handle other statuses or errors
            console.log("Payment failed or pending for event:", event);
        }

    }else{
        console.log("Invalid signature");
        res.sendStatus(400);
    }
    
});

//Exporting the route
module.exports=router