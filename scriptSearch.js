function searchPokeByName(i) {
    let searchName = document.getElementById('search-name' + i).value;
    searchName = searchName.toLowerCase();
    searchIndexOfName(searchName);
    if (searchIndexOfName(searchName)) {
        showPokeBy(searchIndexOfName(searchName), currentPokeNr);
        document.getElementById('search-name' + i).value = '';
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
    for (let i = start; i < myPokesAsObject.length; i++) {
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