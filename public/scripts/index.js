//Show Club Index 
const setupInfo = (data) => {
    const clubIndex = document.querySelector('.clubIndex'); //Using querySelectorAll doesn't work for some reason...
     //Add A List Element to HTML for Each Club
    data.forEach(doc => {
        //document (refers to window element) != doc (refers to piece of data in Firestore database)
        let newLi = document.createElement('li');

        clubInfo = doc.data();
        newLi.innerHTML = clubInfo.club;
        newLi.id = doc.id;
        
        clubData = data;
        newLi.setAttribute('onclick', 'showPage(clubData, newLi.id)');


        clubIndex.appendChild(newLi);
    });
}; 

//Show Indvidual Club Page
function showPage (data, chosenClub) {
    //Hides Club Index
    const clubIndex = document.querySelector('.clubIndex');
    clubIndex.style.display = 'none';

    
    //Displays Current Club's Info
    const clubPage = document.querySelector('.clubPage');
    console.log(chosenClub);
    //const selectClub = z

    /* 
    let html = `
        <h2>${selectClub.club}</h2>
        <p>${selectClub.content}</p>
    `;
    clubPage.innerHTML = html; */

}

//Get Data and Execute Code (when DOM has loaded)
document.addEventListener('DOMContentLoaded', (e) => {
    db.collection('info').get().then(snapshot => {
        setupInfo(snapshot.docs);

    }); 
});