function showPokeBy(searchId, i) {
    if (searchId == i || searchId == 0 || searchId > myPokesAsObject.length) {
        return;
    }
    if (searchId == i + 1) {
        sliderOneRight();
    }
    if (searchId > i + 1) {
        showPokeSomewhereRight(searchId);
    }
    if (searchId < i - 1) {
        showPokeSomewhereLeft(searchId);
    }
    if (searchId == i - 1) {
        sliderOneLeft();
    }
}


async function sliderOneRight() {
    let endNr = myPokesAsObject.length - 1;
    if (currentPokeNr < endNr) {
        let promise = [slideLeft(), pokeCaseLeft(), hideLeft(), slideToDeck()];
        await Promise.all(promise);
    }
    updateAmountPokesAndProgress();
}


async function showPokeSomewhereRight(i) {
    let start = currentPokeNr;
    currentWait = 0;
    addTransitionToAll();
    for (let j = start; j < i; j++) {
        hideAll();
        await sliderOneRight();
    }
    removeTransitionFromAll();
    showAll();
    currentWait = 550;
}


async function showPokeSomewhereLeft(i) {
    let start = currentPokeNr;
    currentWait = 0;
    addTransitionToAll();
    for (let j = start; j > i; j--) {
        hideAll();
        await sliderOneLeft();
    }
    removeTransitionFromAll();
    showAll();
    currentWait = 550;
}


async function sliderOneLeft() {
    let endNr = 1;
    if (currentPokeNr > endNr) {
        let promise = [slideRight(), pokeCaseRight(), hideRight(), slideToFirstPosition()];
        await Promise.all(promise);
    }
    updateAmountPokesAndProgress();
}


async function hideAll() {
    for (let i = 1; i < myPokesAsObject.length; i++) {
        document.getElementById('pokedex' + i).classList.add('display-none');
    }
}


async function showAll() {
    for (let i = 1; i < myPokesAsObject.length; i++) {
        document.getElementById('pokedex' + i).classList.remove('display-none');
    }
}


async function addTransitionToAll() {
    for (let i = 1; i < myPokesAsObject.length; i++) {
        document.getElementById('pokedex' + i).classList.add(`transition${millisec}`);
    }
}


async function removeTransitionFromAll() {
    for (let i = 1; i < myPokesAsObject.length; i++) {
        // minus 1, da dass Letzte (beiden Letzten?) geladene erst beim nächsten Scrollen gerendert wird.
        document.getElementById('pokedex' + i).classList.remove(`transition${millisec}`);
    }
}


// Left SubFunctions


function slideLeft() {
    if (beforePokeNr) {
        document.getElementById('pokedex' + beforePokeNr).style = 'transform: translateX(-200%);';
    }
    document.getElementById('pokedex' + currentPokeNr).style = 'transform: translateX(-100%);';
    document.getElementById('pokedex' + nextPokeNr).style = 'transform: translateX(0%);';
    nextPokeNr++;
    if (nextPokeNr < myPokesAsObject.length) {
        document.getElementById('pokedex' + nextPokeNr).style = 'transform: translateX(100%);';
    }
}


function pokeCaseLeft() {
    currentPokeNr++;
    // nextPokeNr++; bereits bei slideLeft erfolgt
    beforePokeNr++;
}


function hideLeft() {
    let left200PokeNr = beforePokeNr - 1;
    if (left200PokeNr >= 1) {
        document.getElementById('pokedex' + left200PokeNr).classList.add('display-none');
    }
}


function slideToDeck() {
    let left200PokeNr = beforePokeNr - 1;
    if (left200PokeNr >= 1) {
        document.getElementById('pokedex' + left200PokeNr).style = 'transform: translateX(200%);';
        document.getElementById('pokedex' + left200PokeNr).classList.remove('display-none');
    }
}


// Right Subfunctions


function slideRight() {
    if (nextPokeNr < myPokesAsObject.length) {
        document.getElementById('pokedex' + nextPokeNr).style = 'transform: translateX(200%);';
    }
    document.getElementById('pokedex' + currentPokeNr).style = 'transform: translateX(100%);';
    document.getElementById('pokedex' + beforePokeNr).style = 'transform: translateX(0%);';
}


function pokeCaseRight() {
    currentPokeNr--;
    nextPokeNr--;
    beforePokeNr--;
}


function hideRight() {
    if (beforePokeNr >= 1) {
        document.getElementById('pokedex' + beforePokeNr).classList.add('display-none');
    }
}


function slideToFirstPosition() {
    if (beforePokeNr >= 1) {
        document.getElementById('pokedex' + beforePokeNr).style = 'transform: translateX(-100%);';
        document.getElementById('pokedex' + beforePokeNr).classList.remove('display-none');
    }
}