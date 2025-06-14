const express = require('express');
const app = express();
const path = require('path');
const session = require('express-session')
const flash = require('connect-flash');
const cookieParser = require('cookie-parser')

const http = require(`http`)
const https = require(`https`);
const fs = require(`fs`);

//To load environment variables from a .env file into process.env
//const dotenv = require('dotenv');
//dotenv.config();

app.set('view engine', 'ejs');

//to be able to run your js from outside the dir where the views folder is located.
app.set('views', path.join(__dirname, '/views'))

// Static Middleware
app.use(express.static(path.join(__dirname, 'public')))

//Middleware for Connect-Flash
app.use(cookieParser());
app.use(session({
    secret: 'session secret key',
    resave: true, saveUninitialized: true,
    cookie: {maxAge: 60000}
}));

app.use(flash());


const loginPage = require('./routes/login');
const registrationPage = require('./routes/register');
const homePage = require('./routes/home')
const emailVerPage = require('./routes/otp')
const otpPage = require('./routes/otp2')
const resetPage = require('./routes/reset')
const pwResetPage = require('./routes/reset2')
const fundingPage = require('./routes/pay')
const webhookPage = require('./routes/webhook')


//Handling route requests

app.use("/", loginPage);
app.use("/", registrationPage );
app.use("/", homePage);
app.use("/", emailVerPage);
app.use("/", otpPage);
app.use("/", resetPage);
app.use("/", pwResetPage);
app.use("/", fundingPage);
app.use("/", webhookPage);

//app.use("/", require("./routes/login"));
//app.use("/register", require("./routes/register"));
//app.use("/home", require("./routes/homePage"));


//HTTPS Server
const httpsOptions = {
  key: fs.readFileSync(`cauth/instapay.techpitch.co.uk.key`),
  cert: fs.readFileSync(`cauth/instapay_techpitch_co_uk.crt`),

  ca: [
      fs.readFileSync('cauth/DigiCertCA.crt'),
      fs.readFileSync('cauth/TrustedRoot.crt'),
      fs.readFileSync('cauth/My_CA_Bundle.crt')
  ]
};

//Activate the server on port 3000
//app.listen(3000, () => {
    //console.log("LISTENING ON PORT 3000")
//})

const httpsPort = process.env.HTTPS_PORT;
const httpsServer = https.createServer(httpsOptions, app);
httpsServer.listen(httpsPort, () => {
    console.log(`Application is running on port ${httpsPort}`);
});