let pokes = [
    {
        "pokeId": [],
        "pokeName": [],
        "pokeSlot1": [],
        "pokeSlot2": [],
        "pokeImg": [],
        "pokeWeight": [],
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


async function initPokemon() {
    document.getElementById('pokedex-all').innerHTML = '';
    showNextCountPokes();

}

async function get40Pokes() {
    for (let i = 0; i < 10; i++) {
        await showNextCountPokes();
        await promiseWait();
    }
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
            let promises = [promisePush(), promiseReset(), promiseRender(), promiseUpdate(), promiseShow(currentPokeNr)];
            await Promise.all(promises);
        }
        amountLoadedPokes = pokes.length - 1;
        // console.log('amountLoadedPokes: ' + amountLoadedPokes);
        renderAmountLaodedPokes();
        updateProgress();
        redundancy == false;
    }
    functionRunning = false;
}


function renderAmountLaodedPokes() {
    document.getElementById('amount-pokes-loaded' + currentPokeNr).innerHTML = '';
    document.getElementById('amount-pokes-loaded' + currentPokeNr).innerHTML = generateHTMLAmountLoadedPokes();
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
    // console.log(result3);
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


async function promiseWait() {
    let promise = new Promise((resolve, reject) => {
        setTimeout(() => resolve('wait done'), 550);
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
    return currentPoke;
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


function renderPoke(i) {
    document.getElementById('pokedex-all').innerHTML += generateHTMLPokedex(i);
    renderPokeTop(i);
    renderPokeBottom(i);
    stylePokeBgnTop(i);
}


// function showPokeNext(i) {
//     document.getElementById('amount-pokes-loaded' + currentPokeNr).innerHTML = 'App tut nix ...';
//     showNextCountPokes();
//     currentPokeNr = i;
//     beforePokeNr = currentPokeNr - 1;
//     nextPokeNr = currentPokeNr + 1;
//     if (beginPokeNr < amountPokes && nextPokeNr < pokes.length) {
//         document.getElementById('pokedex' + currentPokeNr).style = 'transform: translateX(-100%);';
//         document.getElementById('pokedex' + nextPokeNr).style = 'transform: translateX(0%)';
//         if (currentPokeNr == !1) {
//             document.getElementById('pokedex' + beforePokeNr).style = 'transform: translateX(-200%)';
//         }
//         currentPokeNr = currentPokeNr + 1;
//         beforePokeNr = currentPokeNr - 1;
//         nextPokeNr = currentPokeNr + 1;
//         document.getElementById('pokedex' + beforePokeNr).style = 'transform: translateX(-100%)';
//     } else {
//         return;
//     }
// }


// function showPokeBefore() {
//     document.getElementById('amount-pokes-loaded' + currentPokeNr).innerHTML = 'App tut nix ...';
//     showNextCountPokes();
//     if (currentPokeNr == 1) {
//         return;
//     } else {
//         document.getElementById('pokedex' + currentPokeNr).style = 'transform: translateX(100%)';
//         document.getElementById('pokedex' + beforePokeNr).style = 'transform: translateX(0%)';
//         if (nextPokeNr < pokes.length) {
//             document.getElementById('pokedex' + nextPokeNr).style = 'transform: translateX(200%)';
//         }
//         currentPokeNr = currentPokeNr - 1;
//         beforePokeNr = currentPokeNr - 1;
//         nextPokeNr = currentPokeNr + 1;
//     }
// }


function stylePokeBgnTop(i) {
    let pokeType = document.getElementById('base-type' + i).innerHTML;
    setBgnByType(pokeType, i);
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
    pushToPokesLoaded(pokeId, pokeName, pokeImg, pokeSlot1, pokeSlot2, pokeWeight);
}


function pushToPokesLoaded(pokeId, pokeName, pokeImg, pokeSlot1, pokeSlot2, pokeWeight) {
    pokesLoaded.push(
        {
            "pokeId": [pokeId],
            "pokeName": [pokeName],
            "pokeSlot1": [pokeSlot1],
            "pokeSlot2": [pokeSlot2],
            "pokeImg": [pokeImg],
            "pokeWeight": [pokeWeight],
        }
    )
}


function generateHTMLPokedex(i) {
    return `
    <div id="pokedex${i}" class="pokedex" style="transform: translateX(200%)">
    <div id="pokedex-top${i}" class="pokedex-top">
    <div id="pokedex-nav" class="pokedex-nav">
    <div class="first-buttons">
    <button onclick="showPokeFirst(${i})"><<</button>
    <button onclick="sliderOneLeft()"><</button>
    </div>
    <div id="search" class= "search">
    <input id="search-nr${i}" placeholder="Nr.">
    <button onclick="showPokeBy(${i})">Suche</button>
    </div>
    <button onclick="sliderOneRight()">></button>
    <button onclick="showNextCountPokes()">+4</button>
    </div>
    <div id="amount-pokes-loaded${i}">Serveranfrage läuft ...</div>
    <div id="progress-bar${i}" class="progress-bar">
    <div id="progress${i}" class="progress">
    </div>
    </div> 
        <div class="pokedex-above">
        <div id="pokedex-name${i}" class="pokedex-name">
        </div>
            <div id="pokedex-id${i}">
            </div>
            </div>
            <div id="pokedex-slots${i}" class="pokedex-slots">
            </div>
            </div>
        <div id="pokedex-bottom${i}" class="pokedex-bottom">
        </div>  
        </div> 
    `
}


function renderPokeTop(i) {
    let pokeName = pokes[i]['pokeName'];
    document.getElementById('pokedex-name' + i).innerHTML += `<h1>${pokeName}</h1>`;
    let pokeId = pokes[i]['pokeId'];
    document.getElementById('pokedex-id' + i).innerHTML += `<div># ${pokeId}</div>`;
    let pokeSlot1 = pokes[i]['pokeSlot1'];
    let bgnSlotType = 'bgn-slot-type-' + pokeSlot1;
    document.getElementById('pokedex-slots' + i).innerHTML += `<div id="base-type${i}" class="slot ${bgnSlotType}">${pokeSlot1}</div>`;
    let pokeImg = pokes[i]['pokeImg'];
    document.getElementById('pokedex-top' + i).innerHTML += `<div id="pokeImg"><img src="${pokeImg}"></div>`;
    if (pokes[i]['pokeSlot2'] == 'none') {
    } else {
        let pokeSlot2 = pokes[i]['pokeSlot2'];
        let bgnSlotType = 'bgn-slot-type-' + pokeSlot2;
        document.getElementById('pokedex-slots' + i).innerHTML += `<div class="slot ${bgnSlotType}">${pokeSlot2}</div>`;
    }
    if (pokeSlot1 == 'electric') {
        document.getElementById('pokedex-name' + i).classList.add('color-black');
        document.getElementById('pokedex-id' + i).classList.add('color-black');
        document.getElementById('pokedex-slots' + i).classList.add('color-black');
    }
    if (pokeSlot1 == 'ice') {
        document.getElementById('pokedex-name' + i).classList.add('color-black');
        document.getElementById('pokedex-id' + i).classList.add('color-black');
        document.getElementById('pokedex-slots' + i).classList.add('color-black');
    }
}


function renderPokeBottom(i) {
    let pokeWeight = pokes[i]['pokeWeight'];
    document.getElementById('pokedex-bottom' + i).innerHTML += `Gewicht: ${pokeWeight}`;
}


function showPokeBy(i) {
    showNextCountPokes();
    let searchId = +document.getElementById('search-nr' + i).value;
    if (searchId == i || searchId == 0 || searchId > pokes.length) {
        return;
    }
    if (searchId == i + 1) {
        // showRightPoke
    }
    if (searchId > i + 1) {
        // showSomewhereRight
        // checkOutByX(-200, currentPokeNr, beforePokeNr, nextPokeNr);
        shiftBeforePokes(searchId);
        updatePokeNrsWith(searchId);
        if (currentPokeNr > 1) {
            document.getElementById('pokedex' + beforePokeNr).style = 'transform: translateX(-100%);';
        }
        document.getElementById('pokedex' + currentPokeNr).style = 'transform: translateX(0%);';
        if (nextPokeNr < pokes.length) {
            document.getElementById('pokedex' + nextPokeNr).style = 'transform: translateX(100%);';
        }
        // noticePokeNrsOnLeft200(i);
        // hidePokesByNrs(currentPokeNrLeft200, beforePokeNrLeft200, nextPokeNrLeft200);
        // checkOutByX(200, currentPokeNrLeft200, beforePokeNrLeft200, nextPokeNrLeft200);        
        // showPokesByNrs(currentPokeNrLeft200, beforePokeNrLeft200, nextPokeNrLeft200);

    }
    if (searchId < i - 1) {
        // showSomewhereLeft
        shiftNextPokes(searchId);
        updatePokeNrsWith(searchId);
        if (currentPokeNr > 1) {
            document.getElementById('pokedex' + beforePokeNr).style = 'transform: translateX(-100%);';
        }
        document.getElementById('pokedex' + currentPokeNr).style = 'transform: translateX(0%);';
        if (nextPokeNr < pokes.length) {
            document.getElementById('pokedex' + nextPokeNr).style = 'transform: translateX(100%);';
        }
    }
    if (searchId == i - 1) {
        // showLeftPoke
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
    showNextCountPokes();
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


async function showFirstPoke() {
    let start = currentPokeNr;
    for (let i = start; i > 0; i--) {
        await sliderOneLeft();        
    }
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