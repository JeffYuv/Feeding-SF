var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser')
var nodemailer = require("nodemailer");
var favicon = require('express-favicon');
// path to favicon directory
/*
app.use(favicon(__dirname + '/public/dd-favicon.png'));
*/
// set the view engine to ejs
app.set('view engine', 'ejs');
// use res.render to load up an ejs view file
app.use( express.static( "public" ) );
// Body Parser Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// index page
app.get('/', function(req, res) {
    res.render('page/index');
});
/*
// contact page
app.get('/contact', function(req, res){
  res.render('page/contact');
});
*/
// thankyou page
app.get('/thankyou', function(req, res){
  res.render('page/thankyou');
});


// post route for form submission
app.post('/thankyou', function(req, res){
  const output = `
  <p>You have a new contact request</p>
  <h3>Contact Details</h3>
  <ul>
    <li>Name: ${req.body.name}</li>
    <li>Email: ${req.body.email}</li>
    <li>Email: ${req.body.company}</li>
  </ul>
  <h3>Message</h3>
  <p>${req.body.message}</p>
`;
// create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: 'smtp.zoho.com',
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
        user: 'mdc@triadcharity.com', // generated ethereal user
        pass: 'hackaton123'  // generated ethereal password
    },
    tls:{
      rejectUnauthorized:false
    }
  });
  // setup email data with unicode symbols
  let mailOptions = {
      from: '"Nodemailer Contact" <mdc@triadcharity.com>', // sender address
      to: "kennashka.desilva001@mymdc.net, jeffrey.yuvero001@mymdc.net", // list of receivers
      subject: 'New Contact Request From Website', // Subject line
      text: 'Hello Site Manager', // plain text body
      html: output // html body
  };
  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          return console.log(error);
      }
      console.log('Message sent: %s', info.messageId);
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
      res.render('page/thankyou');
  });
});
app.listen(80, function () {
  console.log('App listening on port 80!');
});
