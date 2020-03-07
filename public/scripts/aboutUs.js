//Add Data from Form To Firestore
const form = document.querySelector('#contactUs');
const email = document.querySelector('#contact-email');
const input = document.querySelector('#contact-input');
const alert = document.querySelector('#contactAlert');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    db.collection('contacts').add({
        email: email.value,
        input: input.value
    });
    form.reset();
    alert.style.display = 'block';
});