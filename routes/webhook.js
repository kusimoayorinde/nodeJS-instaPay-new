const express = require('express');
const crypto = require('crypto');

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
        // Do something with event  
        console.log(event)
        res.sendStatus(200);

    }else{
        console.log("Invalid signature");
        res.sendStatus(400);
    }
    
});

//Exporting the route
module.exports=router