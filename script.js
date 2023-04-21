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


let currentPoke = [];

let currentPokeNr = 1;
let beforePokeNr = currentPokeNr - 1;
let nextPokeNr = currentPokeNr + 1;

let beginPokeNr = 1;
let count = 5;
let endPokeNr = beginPokeNr + count;

let searchPokeNr = 0;

let searchingPoke = false;


function initPokemon() {
    document.getElementById('pokedex-all').innerHTML = '';
    showNextCountPokes();
}


async function showNextCountPokes() {
    await promiseGet();
    await promiseSort();
    await promisePush();
    resetPokesLoaded();
    renderPokes();
    updateParam();
    showCurrentPoke(currentPokeNr);
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


function renderPokes() {
    for (let i = beginPokeNr; i <= endPokeNr; i++) {
        renderPoke(i);
    }
}


async function getNextCountPokes() {
    for (let i = beginPokeNr; i <= endPokeNr; i++) {
        await loadCurrentPoke(i);
        addToPokesLoaded();
    }
    return 'getNextCountPokes end';
}


async function sortPokesLoaded() {
    pokesLoaded.splice(0, 1);
    pokesLoaded.sort(function (a, b) { return a.pokeId - b.pokeId });
    return 'sortPokesLoaded end';
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
    return 'pushPokesLoadedToPokes end';
}

function updateParam() {
    beginPokeNr = pokes.length;
    endPokeNr = beginPokeNr + count;
}

async function loadCurrentPoke(i) {
    let url = `https://pokeapi.co/api/v2/pokemon/${i}`;
    let response = await fetch(url);
    let responseAsJSON = await response.json();
    currentPoke = responseAsJSON;
    return currentPoke;
}






function checkRedundancy() {
    for (let i = 0; i < pokesLoaded.length; i++) {
        let checkId = pokesLoaded[i]['pokeId'][0];
        for (let j = 1; j < pokes.length; j++) {
            let present = pokes[j]['pokeId'].indexOf(checkId);
            // wenn gefunden, dann ist die Position (das Ergebnis) hier immer Null! 
            if (present == 0) {
                // enstsprechendes poke in pokeLoaded finden und löschen
                for (k = 0; k < pokesLoaded.length; k++) {
                    let presentLoaded = pokesLoaded[k]['pokeId'].indexOf(checkId);
                    if (presentLoaded == 0) {
                        console.log('redundandPoke: ' + checkId + 'Position in Loaded = ' + k);
                        pokesLoaded.splice(i, 1);
                    }
                }
            }
        }
    }
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
}


function showCurrentPoke(currentPokeNr) {
    document.getElementById('pokedex' + currentPokeNr).style = 'transform: translateX(0%);';
    document.getElementById('pokedex' + nextPokeNr).style = 'transform: translateX(100%);';
    if (currentPokeNr == 1) {
        return;
    } else {
        document.getElementById('pokedex' + beforePokeNr).style = 'transform: translateX(-100%);';
    }
}


function renderPoke(i) {
    document.getElementById('pokedex-all').innerHTML += generateHTMLPokedex(i);
    renderPokeTop(i);
    renderPokeBottom(i);
    stylePokeBgnTop(i);
}


function showPokeNext() {
    if (beginPokeNr < 1315 && nextPokeNr < pokes.length) {
        document.getElementById('pokedex' + currentPokeNr).style = 'transform: translateX(-100%);';
        document.getElementById('pokedex' + nextPokeNr).style = 'transform: translateX(0%)';
        currentPokeNr = currentPokeNr + 1;
        beforePokeNr = currentPokeNr - 1;
        document.getElementById('pokedex' + beforePokeNr).style = 'transform: translateX(-100%)';
        nextPokeNr = currentPokeNr + 1;
    } else {
        return;
    }
}


function showPokeBefore() {
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
        <button onclick="showNextCountPokes()">getNextCountPokes</button>
    <div id="pokedex-nav" class="pokedex-nav">
                <button onclick="showPokeBefore(${i})"><</button>
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
