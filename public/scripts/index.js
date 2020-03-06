//Code For Showing Club Index 
const setupInfo = (data) => {
    let html = ''; 
    const clubIndex = document.querySelector('.clubIndex'); //Using querySelectorAll doesn't work for some reason...
    data.forEach(doc => {
        //Add A List Element to HTML for Each Club
        const myInfo = doc.data();
        console.log(doc.id);
        const newLi = `
            <li> 
                <div class="clubName" onclick="" id=${doc.id}>${myInfo.club}</div>
                
            </li>
            `;
        html += newLi; 
    });
    clubIndex.innerHTML = html;
    setUpClickHandlers(data); 
}; 
//Add doc.id and then select via that

//When Club Name Is Clicked, Show Club 'Page'
function setUpClickHandlers(data) {
    //Taking Listed Elements and Making Them Clickable
    const clubNames = document.getElementsByClassName('clubName'); //Can't use querySelectorAll because it isn't live    
    for (club of clubNames) {
        club.onclick = (e) => { 
            //console.log('Club element clicked:',club.innerHTML);
            console.log('ID of element clicked:',club.id);
            //Cycles Through Data and Get's Data of Club Clicked
            // db.collection('info') => snapshot.docs => data => for each doc => .data method to extract data of doc => see if club == clicked club's innerHTML
            data.forEach(doc => {
                myInfo = doc.data();
                //console.log(myInfo.club);
    
                console.log('InnerHTML of element clicked:',club.innerHTML);
                if (myInfo.club == club.innerHTML) {
                    currentClub = myInfo;
                };
            });

            //Hides Club Index And Displays Current Club's Info
            const clubIndex = document.querySelector('.clubIndex');
            clubIndex.style.display = 'none';

            const backButton = document.querySelector('#backButton');
            console.log(backButton);
            backButton.style.display = 'block'; 
            console.log(backButton.style.display);

            const clubPage = document.querySelector('.clubPage');
            let html = `
                <button id='backButton'><a href="index.html">Back</a></button>
                <h2>${currentClub.club}</h2>
                <p>${currentClub.content}</p>
            `;
            clubPage.innerHTML = html;

        };
    }; 

};

//Get Data and Execute Code (when DOM has loaded)
document.addEventListener('DOMContentLoaded', (e) => {
    db.collection('info').get().then(snapshot => {
        setupInfo(snapshot.docs);

    }); 
});




