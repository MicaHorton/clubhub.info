//Send Welcome Email
//Setup Stuff
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

//Get Content of Welcome Email 
var htmlmail=fs.readFileSync("welcome.html","utf-8").toString();

//Actual Welcome Email Functon
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



//Add Calendar Event Function
//Setup Stuff
const {google} = require('googleapis');
const calendar = google.calendar('v3');
//Credentials To Service Acount
const googleCredentials = require('./credentials.json');



//Actual Function
function addEvent(event) {
return new Promise(function(resolve, reject) {
    calendar.events.insert({
        calendarId: 'primary',
        resource: {
            'summary': event.eventName,
            'description': event.description,
            'start': {
                'dateTime': event.startTime,
                'timeZone': TIME_ZONE,
            },
            'end': {
                'dateTime': event.endTime,
                'timeZone': TIME_ZONE,
            },
        },
    }, (err, res) => {
        if (err) {
            console.log('Rejecting because of error');
            reject(err);
        }
        console.log('Request successful');
        resolve(res.data);
    });
}); 
