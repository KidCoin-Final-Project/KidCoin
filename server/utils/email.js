var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'kidcoin123@gmail.com',
    pass: 'kidcoin987'
  }
});

function sendEmail (child, emailTo, subjectDescription) {
    var mailOptions = {
        from: 'kidcoin123@gmail.com',
        to: emailTo,
        subject: subjectDescription + " " + child,
        text: 'Log into the app to approve!'
    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
}