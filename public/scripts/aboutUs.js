//Add Data from Form To Firestore
const form = document.querySelector('#contactUs');
const email = document.querySelector('#contact-email');
const input = document.querySelector('#contact-input');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    db.collection('contacts').add({
        email: email.value,
        input: input.value
    });
});