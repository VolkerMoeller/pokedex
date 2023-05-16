function searchMiniPokeByName() {
    let searchName = document.getElementById('mini-search-name').value;
    searchName = searchName.toLowerCase();
    console.log(searchName);
    findMiniPokes(searchName);
    // showSearchedMiniPokes();
    // searchIndexOfName(searchName);
    // if (searchIndexOfName(searchName)) {
    //     showPokeBy(searchIndexOfName(searchName), currentPokeNr);
    //     document.getElementById('search-mini-name' + i).value = '';
    // }
}

function findMiniPokes(searchInput) {
    for (let k = 1; k < 5; k++) {
        let currentName = myPokesAsObject[k]['nameGerman'];
        let result = currentName.startsWith(searchInput);
        if (result == true) {
            document.getElementById('search-results').innerHTML = currentName;
        }
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