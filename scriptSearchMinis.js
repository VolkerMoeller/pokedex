function searchMiniPokeByName() {
    let searchName = document.getElementById('mini-search-name').value;
    searchName = searchName.toLowerCase();
    sortMiniPokes(searchName);
}


function sortMiniPokes(searchName) {
    document.getElementById('search-results').innerHTML = '';
    for (let k = 0; k < pokeCounter; k++) {
        let searchText = myPokesAsObject[k]['nameGerman'];
        searchText = searchText.toLowerCase();
        let result = searchText.startsWith(searchName);
        if (result == true) {
            document.getElementById('search-results').innerHTML += `<p>${searchText}</p><img src="${myPokesAsObject[k]['imgUrl']}" style="width: 100px">`;
        };
    }
}