//SetUp Email Stuff
const functions = require('firebase-functions');
const admin = require("firebase-admin");
const fs=require('fs'); 
const nodemailer = require('nodemailer');
admin.initializeApp();

//Authorize Email Sender
const gmailEmail = "clubhub.lahs@gmail.com";
const gmailPassword = "clubhub100";
const mailTransport = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: gmailEmail,
    pass: gmailPassword,
  },
});

//Get Welcome Email Information
var htmlmail=fs.readFileSync("welcome.html","utf-8").toString();

//Send Welcome Email
exports.sendWelcomeEmail = functions.auth.user().onCreate((user) => {
  const recipent_email = user.email; 
 
  const mailOptions = {
      from: '"ClubHub" <clubhub.lahs@gmail.com>',
      to: recipent_email,
      subject: 'Welcome to MY APP',
       html: htmlmail
  };
  
try {
  mailTransport.sendMail(mailOptions);
  console.log('mail send');
  
} catch(error) {
  console.error('There was an error while sending the email:', error);
}
return null; 
});

//Sends Notification When Someone Uses Contact Form (doesn't work)
/*
contactNotification = bfunctions.https.onCall(
  console.log('Firebase realized this happened!')
  const mailOptions = {
      from: '"ClubHub" <clubhub.lahs@gmail.com>',
      to: '"ClubHub" <clubhub.lahs@gmail.com>',
      subject: 'Someone contacted you!'
  };

  try {
    mailTransport.sendMail(mailOptions);
    console.log('mail sent');
    
  } catch(error) {
    console.error('There was an error while sending the email:', error);
  }
  return null;

); */

/*
exports.contactNotification = functions.database.instance('contacts').ref('Users/mica').onCreate((snapshot, context) => {
  console.log('Firebase realized this happened!')
  const mailOptions = {
      from: '"ClubHub" <clubhub.lahs@gmail.com>',
      to: '"ClubHub" <clubhub.lahs@gmail.com>',
      subject: 'Someone contacted you!'
  };
  
  try {
    mailTransport.sendMail(mailOptions);
    console.log('mail sent');
    
  } catch(error) {
    console.error('There was an error while sending the email:', error);
  }
  return null; 

});
*/


