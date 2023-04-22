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
let count = 5;
let endPokeNr = beginPokeNr + count;

let searchPokeNr = 0;

let searchingPoke = false;

let amountPokes = 1010;
let amountLoadedPokes = 0;

let redundancy = false;


async function initPokemon() {
    document.getElementById('pokedex-all').innerHTML = '';
    showNextCountPokes();
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
        console.log('amountLoadedPokes: ' + amountLoadedPokes);
        renderAmountLaodedPokes();
        redundancy == false;
    }
    functionRunning = false;
}


function renderAmountLaodedPokes() {
    document.getElementById('amount-pokes-loaded' + currentPokeNr).innerHTML = '';
    document.getElementById('amount-pokes-loaded' + currentPokeNr).innerHTML = amountLoadedPokes;
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
    console.log(result1);
}


async function promiseSort() {
    let promise2 = new Promise((resolve, reject) => {
        resolve(sortPokesLoaded());
    });
    let result2 = await promise2;
    console.log(result2);
}


async function promisePush() {
    let promise3 = new Promise((resolve, reject) => {
        resolve(pushPokesLoadedToPokes());
    });
    let result3 = await promise3;
    console.log(result3);
}

async function promiseReset() {
    let promise4 = new Promise((resolve, reject) => {
        resolve(resetPokesLoaded());
    });
    let result4 = await promise4;
    console.log(result4);
}


async function promiseRender() {
    let promise5 = new Promise((resolve, reject) => {
        resolve(renderPokes());
    });
    let result5 = await promise5;
    console.log(result5);
}


async function promiseUpdate() {
    let promise6 = new Promise((resolve, reject) => {
        resolve(updateParam());
    });
    let result6 = await promise6;
    console.log(result6);
}


async function promiseShow() {
    let promise7 = new Promise((resolve, reject) => {
        resolve(showCurrentPoke(currentPokeNr));
    });
    let result7 = await promise7;
    console.log(result7);
}


async function promiseCheck() {
    let promise8 = new Promise((resolve, reject) => {
        resolve(checkRedundancy());
    });
    let result8 = await promise8;
    console.log(result8);
}


async function promiseWait() {
    let promise9 = new Promise((resolve, reject) => {
        setTimeout(() => resolve('wait done'), 2000);
    });
    let result9 = await promise9;
    console.log(result9);
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
    // console.log('pokes.length: ' + pokes.length);
    // console.log('pokesLoaded.length: ' + pokesLoaded.length);
    let startValue = pokes.length - 1;
    // console.log('startValue: ' + startValue);
    let reference = startValue + pokesLoaded.length;
    // console.log('reference: ' + reference);
    let lastPokeIdOfLoaded = pokesLoaded[pokesLoaded.length - 1]['pokeId'][0];
    // console.log('lastPokeIdLoaded: ' + lastPokeIdOfLoaded);
    if (reference == lastPokeIdOfLoaded) {
        // console.log('Hurray');
        redundancy = false;
    } else {
        // console.log('Mist');
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


function showPokeNext(i) {
    document.getElementById('amount-pokes-loaded' + currentPokeNr).innerHTML = '';
    showNextCountPokes()
    currentPokeNr = i;
    beforePokeNr = currentPokeNr - 1;
    nextPokeNr = currentPokeNr + 1;
    if (beginPokeNr < amountPokes && nextPokeNr < pokes.length) {
        document.getElementById('pokedex' + currentPokeNr).style = 'transform: translateX(-100%);';
        document.getElementById('pokedex' + nextPokeNr).style = 'transform: translateX(0%)';
        if (currentPokeNr == !1) {
            document.getElementById('pokedex' + beforePokeNr).style = 'transform: translateX(-200%)';
        }
        currentPokeNr = currentPokeNr + 1;
        beforePokeNr = currentPokeNr - 1;
        nextPokeNr = currentPokeNr + 1;
        document.getElementById('pokedex' + beforePokeNr).style = 'transform: translateX(-100%)';
    } else {
        return;
    }
}


function showPokeBefore() {
    document.getElementById('amount-pokes-loaded' + currentPokeNr).innerHTML = '';
    showNextCountPokes()
    if (currentPokeNr == 1) {
        return;
    } else {
        document.getElementById('pokedex' + currentPokeNr).style = 'transform: translateX(100%)';
        document.getElementById('pokedex' + beforePokeNr).style = 'transform: translateX(0%)';
        if (nextPokeNr < pokes.length) {
            document.getElementById('pokedex' + nextPokeNr).style = 'transform: translateX(200%)';
        }
        currentPokeNr = currentPokeNr - 1;
        beforePokeNr = currentPokeNr - 1;
        nextPokeNr = currentPokeNr + 1;
    }
}

function showPokeFirst(i) {
    currentPoke = i;
    if (currentPokeNr == 1) {
        return;
    } else {
        document.getElementById('pokedex' + currentPokeNr).style = 'transform: translateX(200%);';
        document.getElementById('pokedex' + nextPokeNr).style = 'transform: translateX(200%);';
        document.getElementById('pokedex' + beforePokeNr).style = 'transform: translateX(200%);';
        currentPokeNr = 1;
        beforePokeNr = currentPokeNr - 1;
        nextPokeNr = currentPokeNr + 1;
        document.getElementById('pokedex' + currentPokeNr).style = 'transform: translateX(0%);';
        document.getElementById('pokedex' + nextPokeNr).style = 'transform: translateX(100%);';
        // document.getElementById('pokedex' + beforePokeNr).style = 'transform: translateX(-100%);';
    }
}

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
    <div id="amount-pokes-loaded${i}">Server lädt weitere</div>
    <div id="pokedex-top${i}" class="pokedex-top">
    <div id="pokedex-nav" class="pokedex-nav">
    <div class="first-buttons">
    <button onclick="showPokeFirst(${i})"><<</button>
    <button onclick="showPokeBefore(${i})"><</button>
    </div>
                <div id="search" class= "search">
                    <input id="search-nr${i}" placeholder="Nr.">
                    <button onclick="getSearchedPokemonBy(${i})">Suche</button>
                </div>
                <button onclick="showPokeNext(${i})">></button>
            </div>
        <div class="pokedex-above">
            <div id="pokedex-name${i}">
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