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
const {google} = require('googleapis');
const calendar = google.calendar('v3');

//Authenticate Service Acounnt
function getCredentials() {
  const filePath = path.join(__dirname, 'credentials.json';
  if (fs.existsSync(filePath)) {
    return require(filePath)
  }
  if (process.env.CREDENTIALS) {
    return JSON.parse(process.env.CREDENTIALS)
  }
  throw new Error('Unable to load credentials')
}

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

  const credentials = getCredentials();
  const client = await google.auth.getClient({
    credentials,
    scopes: 'https://www.googleapis.com/auth/calendar',
  }) 

  addEvent(eventData, client).then(data => {
      response.status(200).send(data);
      return;
  }).catch(err => {
      console.error('Error adding event: ' + err.message); 
      response.status(500).send(ERROR_RESPONSE); 
      return;
  });

}); 

/*
  const oAuth2Client = new OAuth2(
      googleCredentials.web.client_id,
      googleCredentials.web.client_secret,
      googleCredentials.web.redirect_uris[0]
  );

  oAuth2Client.setCredentials({
      refresh_token: googleCredentials.refresh_token
  }); */