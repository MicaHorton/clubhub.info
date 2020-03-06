//Show Club Index 
const setupInfo = (data) => {
    const clubIndex = document.querySelector('.clubIndex'); //Using querySelectorAll doesn't work for some reason...
     //Add A List Element to HTML for Each Club
    data.forEach(doc => {
        //document (refers to window element) != doc (refers to piece of data in Firestore database)
        let newLi = document.createElement('li');
        clubInfo = doc.data();

        newLi.innerHTML = clubInfo.club;
        newLi.setAttribute('onclick', 'showPage(clubInfo)');

        clubIndex.appendChild(newLi);
    });
    console.log(clubInfo);
    //Oh I see what is happening, clubInfo changes

}; 

//Show Indvidual Club Page
function showPage (clubInfo) {
    //Hides Club Index
    const clubIndex = document.querySelector('.clubIndex');
    clubIndex.style.display = 'none';

    //Displays Current Club's Info
    const clubPage = document.querySelector('.clubPage');
    let html = `
        <h2>${clubInfo.club}</h2>
        <p>${clubInfo.content}</p>
    `;
    clubPage.innerHTML = html;

}

//Get Data and Execute Code (when DOM has loaded)
document.addEventListener('DOMContentLoaded', (e) => {
    db.collection('info').get().then(snapshot => {
        setupInfo(snapshot.docs);

    }); 
});