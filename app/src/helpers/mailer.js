var nodemailer = require('nodemailer');

// Create a SMTP transport object
var transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "9062d05d56b66e",
      pass: "243136dd4c7e1d"
    }
});

// Message object
var message = {

// sender info
from: 'nihal@delimp.com',

// Comma separated list of recipients
to: "chaurasia016@gmail.com",

// Subject of the message
subject:"req.query.subject", //'Nodemailer is unicode friendly ✔',

// plaintext body
text: "req.query.text" //'Hello to myself!',

 // HTML body
  /*  html:'<p><b>Hello</b> to myself <img src="cid:note@node"/></p>'+
     '<p>Here\'s a nyan cat for you as an embedded attachment:<br/></p>'*/
};

console.log('Sending Mail');

transport.sendMail(message, function(error){
if(error){
  console.log('Error occured');
  console.log(error.message);
  return;
}
else{
    console.log('Message sent successfully!');
}

});
