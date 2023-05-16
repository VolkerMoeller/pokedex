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


function searchIndexOfName(searchName) {
    for (let i = 0; i < myPokesAsObject.length; i++) {
        let nameGerman = myPokesAsObject[i]['nameGerman'];
        if (nameGerman) {
            nameGerman = nameGerman.toLowerCase();
        }
        if (searchName == nameGerman) {
            let index = i;
            return index;
        }
    }
}


async function showFirstPoke() {
    currentWait = 0;
    let start = currentPokeNr;
    await addTransitionToAll();
    for (let i = start; i > 0; i--) {
        let promise1st = [hideAll(), sliderOneLeft()];
        await Promise.all(promise1st);
    }
    let promise2nd = [removeTransitionFromAll(), showAll()];
    await Promise.all(promise2nd);
    currentWait = 550;
}


async function showLastPoke() {
    currentWait = 0;
    let start = currentPokeNr;
    await addTransitionToAll();
    for (let i = start; i < pokes.length; i++) {
        let promise1st = [hideAll(), sliderOneRight()];
        await Promise.all(promise1st);
    }
    let promise2nd = [removeTransitionFromAll(), showAll()];
    await Promise.all(promise2nd);
    currentWait = 550;
}


function showByNr(i) {
    let searchId = +document.getElementById('search-nr' + i).value;
    document.getElementById('search-nr' + i).value = '';
    showPokeBy(searchId, i);
}