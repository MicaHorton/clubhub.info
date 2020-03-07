//Edit Club Info Form
const createForm = document.querySelector('#create-form');
createForm.addEventListener('submit', (e) => {
    e.preventDefault();
    var user = firebase.auth().currentUser;

    db.collection('info').doc(user.uid).set({
        club: createForm['clubName'].value,
        content: createForm['clubContent'].value
    });
    createForm.reset();

    
});

//AUTHENTICATION SETUP CODE
//Register Your Club Code
const signupForm = document.querySelector('#signup-form');
signupForm.addEventListener('submit',(e) => {
    e.preventDefault();

    //Get User Info
    const email = signupForm['signup-email'].value;
    const password = signupForm['signup-password'].value;

    //Sign Up User
    auth.createUserWithEmailAndPassword(email,password).then(cred => {
        console.log(cred.user);
        signupForm.reset();

    })
}) 

//Login Form
const loginForm = document.querySelector('#login-form');
loginForm.addEventListener('submit',(e) => {
    console.log('Button pressed!')
    e.preventDefault();

    //get user info
    const email = loginForm['login-email'].value;
    const password = loginForm['login-password'].value;

    //login user
    auth.signInWithEmailAndPassword(email,password).then(cred => {
        console.log(cred.user);
        loginForm.reset();

    })
})

//Checkbox Code
const officialCheck = document.getElementById('officialCheck');
const onOfficial = document.querySelector('.onOfficial');
console.log(onOfficial);

officialCheck.addEventListener('click', (e) => {
    if (officialCheck.checked == true) {
        onOfficial.style.display = 'block';

    } else {
        onOfficial.style.display = 'none';
    };
});


const donateCheck = document.getElementById('donateCheck');
const onDonate = document.querySelector('.onDonate');

donateCheck.addEventListener('click', (e) => {
    if (donateCheck.checked == true) {
        onDonate.style.display = 'block';
    } else {
        onDonate.style.display = 'none';
    };
}); 
