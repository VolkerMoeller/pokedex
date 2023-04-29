let pokes = [
    {
        "pokeId": [],
        "pokeName": [],
        "pokeSlot1": [],
        "pokeSlot2": [],
        "pokeImg": [],
        "pokeWeight": [],
        "pokeSpecie": [],
        "pokeFlavors": [],
    }
];

let pokesLoaded = [
    {
        "pokeId": [],
        "pokeName": [],
        "pokeSlot1": [],
        "pokeSlot2": [],
        "pokeImg": [],
        "pokeWeight": [],
        "pokeSpecie": [],
        "pokeFlavors": [],
    }
];


let functionRunning = false;
let currentPoke = [];
let currentPokeNr = 1;
let beforePokeNr = currentPokeNr - 1;
let nextPokeNr = currentPokeNr + 1;
let beginPokeNr = 1;
let count = 3;
let endPokeNr = beginPokeNr + count;
let searchPokeNr = 0;
let searchingPoke = false;
let amountPokes = 1010;
let amountLoadedPokes = 0;
let redundancy = false;
let currentPokeNrLeft200
let beforePokeNrLeft200
let nextPokeNrLeft200
let millisec = 0;
let currentWait = 550;
// let currentCardId = 1;
let currentSpecie = [];


async function initPokemon() {
    document.getElementById('pokedex-all').innerHTML = '';
    load();
    if (pokes.length > 1) {
        await loadAndShowSavedPokes();
    }
    await showNextCountPokes();
}

async function loadAndShowSavedPokes() {
    load();
    // beginPokeNr = 1;
    // let count = 3;
    endPokeNr = pokes.length - 1;
    let promises = [promiseReset(), promiseRender(), promiseUpdate(), promiseShow(currentPokeNr)];
    await Promise.all(promises);
    endPokeNr = beginPokeNr + count;
    amountLoadedPokes = pokes.length - 1;
    renderAmountLaodedPokes();
    updateProgress();
}


async function showNextCountPokes() {
    if (!functionRunning) {
        functionRunning = true;
        await promiseGet();
        await promiseSort();
        await promiseCheck();
        if (redundancy == true) {
            await promiseReset();
            return;
        } else {
            let promises = [load(), promisePush(), save(), promiseReset(), promiseRender(), promiseUpdate(), promiseShow(currentPokeNr)];
            await Promise.all(promises);
        }
        amountLoadedPokes = pokes.length - 1;
        renderAmountLaodedPokes();
        updateProgress();
        redundancy == false;
    }
    functionRunning = false;
}


function generateHTMLAmountLoadedPokes() {
    return 'Es wurden ' + amountLoadedPokes + ' von 1010 geladen';
}


async function doGet() {
    if (!functionRunning) {
        functionRunning = true;
        await promiseGet();
        doCheck();
    }
    functionRunning = false;
}


async function doSort() {
    if (!functionRunning) {
        functionRunning = true;
        await promiseSort();
        doCheck();
    }
    functionRunning = false;
}


async function doCheck() {
    if (!functionRunning) {
        functionRunning = true;
        await promiseCheck();
        doPush();
    }
    functionRunning = false;
}


async function doPush() {
    if (!functionRunning) {
        functionRunning = true;
        await promisePush();
        doReset();
    }
    functionRunning = false;
}


async function promiseGet() {
    let promise1 = new Promise((resolve, reject) => {
        resolve(getNextCountPokes());
    });
    let result1 = await promise1;
    return result1;
    // console.log(result1);
}


async function promiseSort() {
    let promise2 = new Promise((resolve, reject) => {
        resolve(sortPokesLoaded());
    });
    let result2 = await promise2;
    return result2;
    // console.log(result2);
}


async function promisePush() {
    let promise3 = new Promise((resolve, reject) => {
        resolve(pushPokesLoadedToPokes());
    });
    let result3 = await promise3;
    return result3;
    console.log(result3);
}

async function promiseReset() {
    let promise4 = new Promise((resolve, reject) => {
        resolve(resetPokesLoaded());
    });
    let result4 = await promise4;
    return result4;
    // console.log(result4);
}


async function promiseRender() {
    let promise5 = new Promise((resolve, reject) => {
        resolve(renderPokes());
    });
    let result5 = await promise5;
    return result5;
    // console.log(result5);
}


async function promiseUpdate() {
    let promise6 = new Promise((resolve, reject) => {
        resolve(updateParam());
    });
    let result6 = await promise6;
    return result6;
    // console.log(result6);
}


async function promiseShow() {
    let promise7 = new Promise((resolve, reject) => {
        resolve(showCurrentPoke(currentPokeNr));
    });
    let result7 = await promise7;
    return result7;
    // console.log(result7);
}


async function promiseCheck() {
    let promise8 = new Promise((resolve, reject) => {
        resolve(checkRedundancy());
    });
    let result8 = await promise8;
    return result8;
    // console.log(result8);
}


async function promiseWait(currentWait) {
    let promise = new Promise((resolve, reject) => {
        setTimeout(() => resolve('wait done'), currentWait);
    });
    let result = await promise;
    return result;
    // console.log(result9);
}


function renderPokes() {
    for (let i = beginPokeNr; i <= endPokeNr; i++) {
        renderPoke(i);
    }
    return 'render done'
}


async function getNextCountPokes() {
    for (let i = beginPokeNr; i <= endPokeNr; i++) {
        await loadCurrentPoke(i);
        addToPokesLoaded();
    }
    return 'get done';
}


async function sortPokesLoaded() {
    pokesLoaded.splice(0, 1);
    pokesLoaded.sort(function (a, b) { return a.pokeId - b.pokeId });
    return 'sort done';
}


async function pushPokesLoadedToPokes() {
    for (let i = 0; i < pokesLoaded.length; i++) {
        pokes.push(
            {
                "pokeId": [pokesLoaded[i]['pokeId'][0]],
                "pokeName": [pokesLoaded[i]['pokeName'][0]],
                "pokeSlot1": [pokesLoaded[i]['pokeSlot1'][0]],
                "pokeSlot2": [pokesLoaded[i]['pokeSlot2'][0]],
                "pokeImg": [pokesLoaded[i]['pokeImg'][0]],
                "pokeWeight": [pokesLoaded[i]['pokeWeight'][0]],
                "pokeSpecie": [pokesLoaded[i]['pokeSpecie'][0]],
                "pokeFlavors": [pokesLoaded[i]['pokeFlavors'][0]],
            }
        );
    }
    return 'push done';
}


function updateParam() {
    beginPokeNr = pokes.length;
    endPokeNr = beginPokeNr + count;
    return 'update done';
}


async function loadCurrentPoke(i) {
    let url = `https://pokeapi.co/api/v2/pokemon/${i}`;
    let response = await fetch(url);
    let responseAsJSON = await response.json();
    currentPoke = responseAsJSON;
    // console.log(currentPoke);
    return currentPoke;
}


async function loadCurrentSpecie(i) {
    let url = pokes[i]['pokeSpecie'][0];
    let response = await fetch(url);
    let responseAsJSON = await response.json();
    currentSpecie = responseAsJSON;
    console.log(currentSpecie);
    return currentSpecie;
}


function checkRedundancy() {
    let startValue = pokes.length - 1;
    let reference = startValue + pokesLoaded.length;
    let lastPokeIdOfLoaded = pokesLoaded[pokesLoaded.length - 1]['pokeId'][0];
    if (reference == lastPokeIdOfLoaded) {
        redundancy = false;
    } else {
        redundancy = true;
    }
    return 'check done';
}


function resetPokesLoaded() {
    pokesLoaded = [
        {
            "pokeId": [],
            "pokeName": [],
            "pokeSlot1": [],
            "pokeSlot2": [],
            "pokeImg": [],
            "pokeWeight": [],
            "pokeSpecie": [],
            "pokeFlavors": [],
        }
    ];
    return 'reset done'
}


function showCurrentPoke(currentPokeNr) {
    document.getElementById('pokedex' + currentPokeNr).style = 'transform: translateX(0%);';
    document.getElementById('pokedex' + nextPokeNr).style = 'transform: translateX(100%);';
    if (currentPokeNr == 1) {
        return 'show done';
    } else {
        document.getElementById('pokedex' + beforePokeNr).style = 'transform: translateX(-100%);';
        return 'show done';
    }
}


function setBgnByType(pokeType, i) {
    document.getElementById('pokedex-top' + i).classList.add('bgn-type-' + pokeType);
}


function addToPokesLoaded() {
    let pokeId = currentPoke['id'];
    let pokeName = currentPoke['name'];
    let pokeImg = currentPoke['sprites']['other']['home']['front_default'];
    let pokeSlot1 = currentPoke['types'][0]['type']['name'];
    let pokeSlot2 = '';
    if (currentPoke['types'].length == 2) {
        pokeSlot2 = currentPoke['types'][1]['type']['name'];
    } else {
        pokeSlot2 = 'none';
    }
    let pokeWeight = currentPoke['weight'];
    let pokeSpecie = currentPoke['species']['url'];
    let pokeFlavors = '';
    pushToPokesLoaded(pokeId, pokeName, pokeImg, pokeSlot1, pokeSlot2, pokeWeight, pokeSpecie, pokeFlavors);
}


function pushToPokesLoaded(pokeId, pokeName, pokeImg, pokeSlot1, pokeSlot2, pokeWeight, pokeSpecie, pokeFlavors) {
    pokesLoaded.push(
        {
            "pokeId": [pokeId],
            "pokeName": [pokeName],
            "pokeSlot1": [pokeSlot1],
            "pokeSlot2": [pokeSlot2],
            "pokeImg": [pokeImg],
            "pokeWeight": [pokeWeight],
            "pokeSpecie": [pokeSpecie],
            "pokeFlavors": [pokeFlavors],
        }
    )
}


function format3LeftHandZeros(value) {
    value = value.toString();
    let formatValue = value.padStart(4, '0');
    return formatValue;
}


function hoverNavigationOver(j, i) {
    let pokeSlot1 = pokes[i]['pokeSlot1'][0];
    let bgnHoverType = 'bgn-hover-type-' + pokeSlot1;
    document.getElementById('btn-card' + j + i).classList.add(`${bgnHoverType}`);
}


function hoverNavigationOut(j, i) {
    let pokeSlot1 = pokes[i]['pokeSlot1'][0];
    let bgnHoverType = 'bgn-hover-type-' + pokeSlot1;
    document.getElementById('btn-card' + j + i).classList.remove(`${bgnHoverType}`);
}

function showPokeByInit(i) {
    let searchId = +document.getElementById('search-nr' + i).value;
    showPokeBy(searchId, i);
}

function showPokeBy(searchId, i) {
    if (searchId == i || searchId == 0 || searchId > pokes.length) {
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


function noticePokeNrsOnLeft200(i) {
    currentPokeNrLeft200 = i;
    beforePokeNrLeft200 = currentPokeNrLeft200 - 1;
    nextPokeNrLeft200 = currentPokeNrLeft200 + 1;
}


function updatePokeNrsWith(i) {
    currentPokeNr = i;
    beforePokeNr = currentPokeNr - 1;
    nextPokeNr = currentPokeNr + 1;
}


function checkOutByX(i, currentPoke, beforePoke, nextPoke) {
    if (beforePoke) {
        document.getElementById('pokedex' + beforePoke).style = `transform: translateX(${i}%);`;
    }
    document.getElementById('pokedex' + currentPoke).style = `transform: translateX(${i}%);`;
    document.getElementById('pokedex' + nextPoke).style = `transform: translateX(${i}%);`;
}


function checkOutRight200() {
    if (beforePokeNr) {
        document.getElementById('pokedex' + beforePokeNr).style = 'transform: translateX(200%);';
    }
    document.getElementById('pokedex' + currentPokeNr).style = 'transform: translateX(200%);';
    document.getElementById('pokedex' + nextPokeNr).style = 'transform: translateX(200%);';
}


async function shiftBeforePokes(searchId) {
    let position = -200;
    let startNr = currentPokeNr;
    let endNr = searchId;
    for (let i = startNr; i <= endNr; i++) {
        await shiftPokeToXByNr(i, position);
    }


}


function shiftNextPokes(searchId) {
    let position = +200;
    let startNr = currentPokeNr;
    let endNr = searchId;
    for (let i = startNr; i >= endNr; i--) {
        shiftPokeToXByNr(i, position);
    }
}


async function shiftPokeToXByNr(pokeNr, position) {
    document.getElementById('pokedex' + pokeNr).style = `transform: translateX(${position}%);`;
}


function updateProgress() {
    let progressWidth = pokes.length / amountPokes * 100;
    document.getElementById('progress' + currentPokeNr).style = `width: ${progressWidth}%`;
}


function checkOutRight200() {
    if (beforePokeNr) {
        document.getElementById('pokedex' + beforePokeNr).style = 'transform: translateX(200%);';
    }
    document.getElementById('pokedex' + currentPokeNr).style = 'transform: translateX(200%);';
    document.getElementById('pokedex' + nextPokeNr).style = 'transform: translateX(200%);';
}


// sliderOneRight


async function sliderOneRight() {
    let endNr = pokes.length - 1;
    if (currentPokeNr < endNr) {
        await cardSlideLeft();
        await updatePokeCaseLeft();
        await cardHideLeft();
        await cardSlideToDeck();
        // let promises = [cardSlideLeft(), updatePokeCaseLeft(), cardHideLeft(), cardSlideToDeck()];
        // await Promise.all(promises);
        await promiseWait();
        await cardDisplayRight200();
    }
    renderAmountLaodedPokes();
    updateProgress();
    // showNextCountPokes();
}


async function cardSlideLeft() {
    let promise = new Promise((resolve, reject) => {
        resolve(slideLeft());
    });
    let result = await promise;
    return result;

}


async function updatePokeCaseLeft() {
    let promise = new Promise((resolve, reject) => {
        resolve(pokeCaseLeft());
    });
    let result = await promise;
    return result;
}


async function cardHideLeft() {
    let promise = new Promise((resolve, reject) => {
        resolve(hideLeft());
    });
    let result = await promise;
    return result;
}


async function updatePokeCaseLeft() {
    let promise = new Promise((resolve, reject) => {
        resolve(pokeCaseLeft());
    });
    let result = await promise;
    return result;
}


async function cardSlideToDeck() {
    let promise = new Promise((resolve, reject) => {
        resolve(slideToDeck());
    });
    let result = await promise;
    return result;
}


async function cardDisplayRight200() {
    let promise = new Promise((resolve, reject) => {
        resolve(displayRight200());
    });
    let result = await promise;
    return result;
}


function slideLeft() {
    if (beforePokeNr) {
        document.getElementById('pokedex' + beforePokeNr).style = 'transform: translateX(-200%);';
    }
    document.getElementById('pokedex' + currentPokeNr).style = 'transform: translateX(-100%);';
    document.getElementById('pokedex' + nextPokeNr).style = 'transform: translateX(0%);';
    nextPokeNr++;
    if (nextPokeNr < pokes.length) {
        document.getElementById('pokedex' + nextPokeNr).style = 'transform: translateX(100%);';
    }
}


function hideLeft() {
    let left200PokeNr = beforePokeNr - 1;
    if (left200PokeNr >= 1) {
        document.getElementById('pokedex' + left200PokeNr).classList.add('display-none');
    }
}


function pokeCaseLeft() {
    currentPokeNr++;
    // nextPokeNr++; bereits bei slideLeft erfolgt
    beforePokeNr++;
}


function slideToDeck() {
    let left200PokeNr = beforePokeNr - 1;
    if (left200PokeNr >= 1) {
        document.getElementById('pokedex' + left200PokeNr).style = 'transform: translateX(200%);';
    }
}


function displayRight200() {
    let left200PokeNr = beforePokeNr - 1;
    if (left200PokeNr >= 1) {
        document.getElementById('pokedex' + left200PokeNr).classList.remove('display-none');
    }
}


// show First or Last

async function showFirstPoke() {
    currentWait = 0;
    let start = currentPokeNr;
    addTransitionToAll();
    // await getPromise(addTransitionToAll());
    for (let i = start; i > 0; i--) {
        hideAll();
        // await getPromise(hideAll());
        await sliderOneLeft();
    }
    removeTransitionFromAll();
    // await getPromise(removeTransitionFromAll());
    // await promiseWait(0);
    showAll();
    // await getPromise(showAll());
    currentWait = 550;
}


// async function getPromise(func) {
//     let promise = new Promise((resolve, reject) => {
//         resolve(func);
//     });
//     let result = await promise;
//     console.log(result);
//     return result;
// }


async function showLastPoke() {
    currentWait = 0;
    let start = currentPokeNr;
    addTransitionToAll();
    // await getPromise(addTransitionToAll());
    for (let i = start; i < pokes.length; i++) {
        hideAll();
        // await getPromise(hideAll());
        await sliderOneRight();
        // await sliderOneRight();
    }
    removeTransitionFromAll();
    // await getPromise(removeTransitionFromAll());
    // await promiseWait(0);
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


// sliderOneLeft


async function sliderOneLeft() {
    let endNr = 1;
    if (currentPokeNr > endNr) {
        await cardSlideRight();
        await updatePokeCaseRight();
        await cardHideRight();
        await cardSlideToFirstPosition();
        // let promises = [cardSlideLeft(), updatePokeCaseLeft(), cardHideLeft(), cardSlideToDeck()];
        // await Promise.all(promises);
        await promiseWait();
        await cardDisplayFirstPosition();
    }
    renderAmountLaodedPokes();
    updateProgress();
}


async function cardSlideRight() {
    let promise = new Promise((resolve, reject) => {
        resolve(slideRight());
    });
    let result = await promise;
    return result;

}


async function updatePokeCaseRight() {
    let promise = new Promise((resolve, reject) => {
        resolve(pokeCaseRight());
    });
    let result = await promise;
    return result;
}


async function cardHideRight() {
    let promise = new Promise((resolve, reject) => {
        resolve(hideRight());
    });
    let result = await promise;
    return result;
}



async function updatePokeCaseLeft() {
    let promise = new Promise((resolve, reject) => {
        resolve(pokeCaseLeft());
    });
    let result = await promise;
    return result;
}


async function cardSlideToFirstPosition() {
    let promise = new Promise((resolve, reject) => {
        resolve(slideToFirstPosition());
    });
    let result = await promise;
    return result;
}


async function cardDisplayFirstPosition() {
    let promise = new Promise((resolve, reject) => {
        resolve(displayFirstPosition());
    });
    let result = await promise;
    return result;
}


function slideRight() {

    if (nextPokeNr < pokes.length) {
        document.getElementById('pokedex' + nextPokeNr).style = 'transform: translateX(200%);';
    }
    document.getElementById('pokedex' + currentPokeNr).style = 'transform: translateX(100%);';
    document.getElementById('pokedex' + beforePokeNr).style = 'transform: translateX(0%);';
}


function hideRight() {
    if (beforePokeNr >= 1) {
        document.getElementById('pokedex' + beforePokeNr).classList.add('display-none');
    }
}


function pokeCaseRight() {
    currentPokeNr--;
    nextPokeNr--;
    beforePokeNr--;
}


function slideToFirstPosition() {
    if (beforePokeNr >= 1) {
        document.getElementById('pokedex' + beforePokeNr).style = 'transform: translateX(-100%);';
    }
}


function displayFirstPosition() {
    if (beforePokeNr >= 1) {
        document.getElementById('pokedex' + beforePokeNr).classList.remove('display-none');
    }
}


function addCurrentTransition() {
    document.getElementById('pokedex' + currentPokeNr).classList.add(`transition${millisec}`);
    if (beforePokeNr >= 1) {
        document.getElementById('pokedex' + beforePokeNr).classList.add(`transition${millisec}`);
    }
    if (nextPokeNr < pokes.length) {
        document.getElementById('pokedex' + nextPokeNr).classList.add(`transition${millisec}`);
    }
}


function addTransitionToAll() {
    for (let i = 1; i < pokes.length; i++) {
        document.getElementById('pokedex' + i).classList.add(`transition${millisec}`);
    }
}


function removeTransitionFromAll() {
    for (let i = 1; i < pokes.length; i++) {
        document.getElementById('pokedex' + i).classList.remove(`transition${millisec}`);
    }
}


function hideAll() {
    for (let i = 1; i < pokes.length; i++) {
        document.getElementById('pokedex' + i).classList.add('display-none');
    }
}


function showAll() {
    for (let i = 1; i < pokes.length; i++) {
        document.getElementById('pokedex' + i).classList.remove('display-none');
    }
}


function removeCurrentTransition() {
    document.getElementById('pokedex' + currentPokeNr).classList.remove(`transition${millisec}`);
    if (beforePokeNr >= 1) {
        document.getElementById('pokedex' + beforePokeNr).classList.remove(`transition${millisec}`);
    }
    if (nextPokeNr < pokes.length) {
        document.getElementById('pokedex' + nextPokeNr).classList.remove(`transition${millisec}`);
    }
}


function searchPokeByName(i) {
    let searchName = document.getElementById('search-name' + i).value;
    searchName = searchName.toLowerCase();
    console.log('Gesuchter Name: ' + searchName);
    searchIndexOfName(searchName);
    showPokeBy(searchIndexOfName(searchName), currentPokeNr);
}

function searchIndexOfName(searchName) {
    for (let i = 0; i < pokes.length; i++) {
        let loadedPokeName = pokes[i]['pokeName'][0];
        if (searchName == loadedPokeName) {
            let index = i;
            console.log(index);
            return index;
        }
    }



}


function showCurrentCardById(i, j) {
    setAllCardsToDefault();
    setCurrentCardToActiv(i);
    setCurrentSlideOnActiv(j);
}


function setAllCardsToDefault() {
    for (let j = 1; j <= 4; j++) {
        let cardToHide = 'card' + j + currentPokeNr;
        document.getElementById(cardToHide).classList.add('display-none');
        // document.getElementById(cardToHide).classList.remove('active-card');
    }
}


function setCurrentCardToActiv(i) {
    let cardToShow = i;
    document.getElementById(cardToShow).classList.remove('display-none');
    // document.getElementById(cardToShow).classList.add('active-card');
}



function setCurrentSlideOnActiv(j) {
    setAllSliderToDefault();
    let pokeSlot1 = pokes[currentPokeNr]['pokeSlot1'][0];
    let bgnActiveType = 'bgn-slot-type-' + pokeSlot1;
    let bgnDefaultType = 'bgn-type-' + pokeSlot1;
    let currentSlide = j;
    document.getElementById(currentSlide).classList.remove(`${bgnDefaultType}`);
    document.getElementById(currentSlide).classList.add(`${bgnActiveType}`);
}

function setAllSliderToDefault() {
    let pokeSlot1 = pokes[currentPokeNr]['pokeSlot1'][0];
    let bgnActiveType = 'bgn-slot-type-' + pokeSlot1;
    let bgnDefaultType = 'bgn-type-' + pokeSlot1;
    let bgnHoverType = 'bgn-hover-type-' + pokeSlot1;
    for (let i = 1; i <= 4; i++) {
        let sliderId = 'btn-card' + i + currentPokeNr;
        document.getElementById(sliderId).classList.remove(`${bgnActiveType}`);
        document.getElementById(sliderId).classList.remove(`${bgnHoverType}`);
        document.getElementById(sliderId).classList.add(`${bgnDefaultType}`);
    }
}


// let pokeSlot1 = pokes[i]['pokeSlot1'][0];
// let bgnHoverType = 'bgn-hover-type-' + pokeSlot1;
// document.getElementById('btn-card' + j + i).classList.add(`${bgnHoverType}`);

