//Send Welcome Email
//Setup Dependencies
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


//Setup Dependencies
const {google} = require('googleapis');
const OAuth2 = google.auth.OAuth2; 
const calendar = google.calendar('v3');
const functions = require('firebase-functions');

const googleCredentials = require('./credentials.json');

const ERROR_RESPONSE = {
    status: "500",
    message: "There was an error adding an event to your Google calendar"
};
const TIME_ZONE = 'EST';

//Create Event 
function addEvent(event, auth) {
  return new Promise(function(resolve, reject) {
      calendar.events.insert({
          auth: auth,
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

//Add Event To Calendar
exports.addEventToCalendar = functions.https.onRequest((request, response) => {
  const eventData = {
      eventName: request.body.eventName,
      description: request.body.description,
      startTime: request.body.startTime,
      endTime: request.body.endTime
  };
  const oAuth2Client = new OAuth2(
      googleCredentials.web.client_id,
      googleCredentials.web.client_secret,
      googleCredentials.web.redirect_uris[0]
  );

  oAuth2Client.setCredentials({
      refresh_token: googleCredentials.refresh_token
  });

  addEvent(eventData, oAuth2Client).then(data => {
      response.status(200).send(data);
      return;
  }).catch(err => {
      console.error('Error adding event: ' + err.message); 
      response.status(500).send(ERROR_RESPONSE); 
      return;
  });
}); */


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


