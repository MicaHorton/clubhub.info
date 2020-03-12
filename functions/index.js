//SEND WELCOME MAIL 
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

//ADD CALENDAR EVENT
//Setup Calendar API & Authenticate Service Acount
const {google} = require('googleapis');
const path = require('path');  
const key = require(path.join(__dirname, 'credentials.json'));
const jwtClient = new google.auth.JWT(
  key.client_email,
  null,
  key.private_key,
  ["https://www.googleapis.com/auth/calendar"],
  null
);
const calendar = google.calendar({ version: 'v3', auth: jwtClient });

const ERROR_RESPONSE = {
  status: "500",
  message: "There was an error adding an event to your Google calendar"
};
const TIME_ZONE = 'EST';

//Create Calendar Event
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
}

//Add Event To Service Acount 
exports.addEventToCalendar = functions.https.onRequest((request, response) => {
  const eventData = {
      eventName: request.body.eventName,
      description: request.body.description,
      startTime: request.body.startTime,
      endTime: request.body.endTime
  }; 

  addEvent(eventData).then(data => {
      response.status(200).send(data);
      return;
  }).catch(err => {
      console.error('Error adding event: ' + err.message); 
      response.status(500).send(ERROR_RESPONSE); 
      return;
  });

}); 
