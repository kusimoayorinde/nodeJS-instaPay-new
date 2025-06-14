require('dotenv').config(); 

var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.USER,
    pass: process.env.PASS
  }
});

var mailOptions = {
  from: 'youremail@gmail.com',
  to: 'kusimoayorinde@gmail.com',
  subject: 'Sending Email using Node.js',
  text: 'That was easy!'
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
}); 