//Track Acount Status
auth.onAuthStateChanged(user => {
    setupUI(user);
    if (user) {
        console.log('User logged in: ', user);
        console.log(user)
    } else {
        console.log('User logged out.');
    }
});

//Show or Hide Menu Links (and Forms) Based on Acount Status
const loggedInStuff = document.querySelectorAll('.logged-in');
const loggedOutStuff = document.querySelectorAll('.logged-out');
const setupUI = (user) => {
    if (user) {
        loggedInStuff.forEach(item => item.style.display = 'block');
        loggedOutStuff.forEach(item => item.style.display = 'none');
    } else {
        loggedInStuff.forEach(item => item.style.display = 'none');
        loggedOutStuff.forEach(item => item.style.display = 'block');
    }
};

//Sign Out Code 
const logout = document.querySelector('#signout');
logout.addEventListener('click', (e) => {
    e.preventDefault();
    auth.signOut();

}) 

