const https = require('https')
const express = require('express');
const welcome = require('./login');

const dotenv = require('dotenv');
dotenv.config();

// Creating express Router
const router=express.Router()

function payFunction() {
    let number;
    let amount = prompt("Please enter the amount:", 100);
    if (amount == null || amount == "") {
      number = "User cancelled the process.";
    } else {
      number = amount;
      console.log(number)
      console.log(amount)
      console.log(email)
    }
}


router.get('/pay', (req, res) =>{
    console.log('Pay your money')
    const params = JSON.stringify({
        "email": "customer@email.com",
        "amount": "20000"
    })

    const options = {
        hostname: 'api.paystack.co',
        port: 443,
        path: '/transaction/initialize',
        method: 'POST',
        headers: {
            Authorization: 'Bearer sk_test_2807786a573f55bd6ba23d17534b28900cfd32c8',
            'Content-Type': 'application/json'
        }
    }

    const reqPay = https.request(options, resPay => {
        let data = ''

        resPay.on('data', (chunk) => {
            data += chunk
        });

        resPay.on('end', () => {
            data = JSON.parse(data)
            console.log(data)
            authzURL=data['data']
            authzURL=authzURL['authorization_url']
            console.log(authzURL)
            res.redirect(authzURL)
        })
    }).on('error', error => {
        console.error(error)
    })

    reqPay.write(params)
    reqPay.end()

})

//Exporting the route
module.exports=router
