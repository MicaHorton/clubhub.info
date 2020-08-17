# STEAM-Repository
Officer's page is broken do to change in Firbase, will be fixed.

## To-Do's
- selection algorithim bug
- calendar bug
- more data fields feature
- sign-up notification feature
- bug report notification feature

## Finished To-Do's
- put club code on a seperate page
- reinstall sign-up code 
- allow user to edit content 
- make header wosrk on all pages
- fix margins and styling
- Login button dissapears on signout. (Was a typo.)
- Blinking of content that should be hidden. (Still sort of noticeable, better solution?)


## Documentation

- Each page is connected to the universal.js which includes the Javascript for the header. Some pages hava their own .js file (ex. aboutUs.html is connected to universal.js and aboutUs.js)
- The website uses Bootstrap's CDN to style the site. Most pages only use Bootstrap's CSS, but the pages that require modals uses the Bootstrap's Javascript CDN and the jQuery CDN.
- The website uses Firebase's authentication tools. The Net Ninja's tutorials (https://www.youtube.com/watch?v=aN1LnNq4z54&list=PL4cUxeGkcC9jUPIes_B8vRjn1_GaplOPQ) explain this really well. This site couldn't have been made without them!
- The website use's Firebase's cloud functions to send an email giving cloud president's access to the calender upon acount creation. Unfortuantely, this code can't be uploaded to Github for security reasons, but it follows the code in this tutorial (https://medium.com/@adityaprakashjoshi1/send-welcome-mail-to-new-user-using-firebase-cloud-functions-dcc36459a35d) with minimal modifications. As you might notice, Node.js is necessary to run cloud functions, and the code also uses the nodemailer module.

List of Errors
+ Login button dissapears on signout. (Fixed. Was a typo.)
+ Blinking of content that should be hidden. (Fixed. Still sort of noticeable.)
- Calender issue

Firebase Authentication Errors
https://www.youtube.com/watch?v=aN1LnNq4z54&list=PL4cUxeGkcC9jUPIes_B8vRjn1_GaplOPQ

Welcome Mail Tutorial
https://medium.com/@adityaprakashjoshi1/send-welcome-mail-to-new-user-using-firebase-cloud-functions-dcc36459a35d

Contact Form Notification (not yet working)
https://firebase.google.com/docs/functions/database-events
