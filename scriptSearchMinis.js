function searchMiniPokeByName() {
    let searchName = document.getElementById('search-nameMiniAll').value;
    searchName = searchName.toLowerCase();
    sortMiniPokes(searchName);
}


function sortMiniPokes(searchName) {
    document.getElementById('search-results').innerHTML = '';
    for (let k = 1; k < myPokesAsObject.length; k++) {
        let searchText = myPokesAsObject[k]['nameGerman'];
        searchText = searchText.toLowerCase();
        let result = searchText.startsWith(searchName);
        if (result == true) {
            // document.getElementById('search-results').innerHTML += `<p>${searchText}</p><img src="${myPokesAsObject[k]['imgUrl']}" style="width: 100px">`;
            let formatedId = format3LeftHandZeros(myPokesAsObject[k]['id']);
            document.getElementById('search-results').innerHTML += generateHTMLMiniAllSearch(k, searchText, formatedId);
            renderBackgroundMiniSearch(k);
            // renderGermanNameMiniSearch(searchId);
            changeMiniToBlackMiniSearch(k);
        
        
        };
    }
}


function renderBackgroundMiniSearch(i) {
    let miniSlot1 = myPokesAsObject[i]['slot1'];
    let bgnType = 'bgn-type-' + miniSlot1;
    document.getElementById('miniPokeCardSearch' + i).classList.add(`${bgnType}`);
}


function changeMiniToBlackMiniSearch(i) {
    let miniSlot1 = myPokesAsObject[i]['slot1'];
    if (miniSlot1 == 'electric' || miniSlot1 == 'ice') {
        document.getElementById('germanNameSearch' + i).classList.add(`color-black`);
        document.getElementById('pokeMiniSearch' + i).classList.add(`color-black`);
    }
}


function generateHTMLMiniAllSearch(k, searchText, formatedId) {
    return `
        <div id="miniPokeCardSearch${k}"class="mini-poke-card">
            <button onclick="showPokeCard(${k})">
                <div id="germanNameSearch${k}" style="color: white">${myPokesAsObject[k]['nameGerman']}</div>
                <div id="pokeMiniSearch${k}" style="color: white"># ${formatedId}</div>
                <div class="mini-poke-img-place" id="imageSearch${k}">
                <img src="${myPokesAsObject[k]['imgUrl']}" style="width: 160px">
                </div>
                </button>
                </div>
                `
}


function showByNrMiniAll() {
    let searchId = +document.getElementById('search-nrMiniAll').value;
    document.getElementById('search-nrMiniAll').value = '';
    showPokeMiniAllBy(searchId);
}


function showPokeMiniAllBy(searchId) {
    document.getElementById('search-results').innerHTML = '';
    document.getElementById('search-results').innerHTML += `<p><img src="${myPokesAsObject[searchId]['imgUrl']}" style="width: 100px">`;
};

