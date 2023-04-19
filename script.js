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
    getNextCountPokes();
}


async function getNextCountPokes() {
    for (let i = beginPokeNr; i <= endPokeNr; i++) {
        await loadCurrentPoke(i);
        addToPokesLoaded();
    }
    sortPokesLoaded();
    pushPokesLoadedToPokes();
    for (let i = beginPokeNr; i <= endPokeNr; i++) {
        renderPoke(i);
    }
    resetPokesLoaded();
    updateParam();
    showCurrentPoke(currentPokeNr);
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


function sortPokesLoaded() {
    pokesLoaded.splice(0, 1);
    pokesLoaded.sort(function (a, b) { return a.pokeId - b.pokeId });
}


function pushPokesLoadedToPokes() {
    for (let i = 0; i < pokesLoaded.length; i++) {
        checkId = pokesLoaded[i]['pokeId'][0];
        checkRedundancy(checkId);
        pokes.push(
            {
                "pokeId": [pokesLoaded[i]['pokeId'][0]],
                "pokeName": [pokesLoaded[i]['pokeName'][0]],
                "pokeSlot1": [pokesLoaded[i]['pokeSlot1'][0]],
                "pokeSlot2": [pokesLoaded[i]['pokeSlot2'][0]],
                "pokeImg": [pokesLoaded[i]['pokeImg'][0]],
                "pokeWeight": [pokesLoaded[i]['pokeWeight'][0]],
            }
        )
    }
}


function checkRedundancy(checkId) {
    for (let i = 1; i < pokes.length; i++) {
        // let index = pokes[i]['pokeId'][0].indexOf(checkId);
        let present = pokes[i]['pokeId'].indexOf(checkId);
        // wenn gefunden, dann ist die Position hier immer Null! 
        if (present == 0) {
            console.log('present');
            console.log(i);
            console.log(checkId);
            // enstsprechendes poke in pokeLoaded finden und löschen
            for (i = 0; i < pokesLoaded.length; i++) {
                let presentLoaded = pokesLoaded[i]['pokeId'].indexOf(checkId);
                if (presentLoaded == 0) {
                    console.log('presentLoaded');
                    console.log(i);
                    console.log(checkId);
                    deleteRedundandPoke(i)
                }
            }
        }
    }
}


function deleteRedundandPoke(i) {
    pokesLoaded.splice(i, 1);
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
    document.getElementById('pokedex' + currentPokeNr).style = 'transform: translateX(0%); z-index: 1;';
    document.getElementById('pokedex' + nextPokeNr).style = 'transform: translateX(100%); z-index: -1;';
    if (currentPokeNr == 1) {
        return;
    } else {
        document.getElementById('pokedex' + beforePokeNr).style = 'transform: translateX(-100%); z-index: -1;';
    }
}


function getNextPokemon() {
    currentPokeNr++;
    lastPokeNr = currentPokeNr - 1;
    nextPokeNr = currentPokeNr + 1;
    if (nextPokeNr >= pokemons.length) {
        document.getElementById('pokedex' + currentPokeNr).style = 'transform: translateX(-100%)';
        document.getElementById('pokedex' + currentPokeNr).style = 'z-index: -1';
        loadPokemonBy(nextPokeNr);
    }
    else {
        document.getElementById('pokedex' + currentPokeNr).style = 'transform: translateX(-100%)';
        document.getElementById('pokedex' + currentPokeNr).style = 'z-index: -1';
        document.getElementById('pokedex' + nextPokeNr).style = 'transform: translateX(0%)';
    }
}


function renderPoke(i) {
    document.getElementById('pokedex-all').innerHTML += generateHTMLPokedex(i);
    renderPokeTop(i);
    stylePokeBgnTop(i);
    renderPokeBottom(i);
}


function showPokeNext() {
    if (beginPokeNr < 1315) {
        getNextCountPokes();
        document.getElementById('pokedex' + currentPokeNr).style = 'transform: translateX(-100%)';
        document.getElementById('pokedex' + currentPokeNr).style = 'z-index: -1';
        document.getElementById('pokedex' + nextPokeNr).style = 'transform: translateX(0%)';
        document.getElementById('pokedex' + nextPokeNr).style = 'z-index: +1';
        currentPokeNr = currentPokeNr + 1;
        beforePokeNr = currentPokeNr - 1;
        nextPokeNr = currentPokeNr + 1;
    } else {
        return;
    }
}


function showLastPokedex() {
    if (currentPokeNr > 0) {
        document.getElementById('pokedex' + currentPokeNr).style = 'transform: translateX(0%)';
        document.getElementById('pokedex' + nextPokeNr).style = 'transform: translateX(100%)';
        document.getElementById('pokedex' + nextPokeNr).style = 'z-index: -1';
        currentPokeNr--;
        lastPokeNr = currentPokeNr - 1;
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
    <div id="pokedex${i}" class="pokedex" style="z-index: -1">
    <div id="pokedex-top${i}" class="pokedex-top">
    <button onclick="getNextCountPokes()">getNextCountPokes</button>
    <div id="pokedex-nav" class="pokedex-nav">
    <button onclick="showPokeBefore()"><</button>
    <div id="search" class= "search">
    <input id="search-nr${i}" placeholder="Nr."><button onclick="getSearchedPokemonBy(${i})">Suche</button>
    </div>
    <button onclick="showPokeNext()">></button>
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


// function getSearchedPokemonBy(i) {
//     searchingPoke = true;
//     searchNumber = +document.getElementById('search-nr' + i).value
//     if (checkIfPokemonInArray(searchNumber) == true) {
//         showSearchedPokemonBy(searchNumber);
//     } else {
//         searchingPoke == true;
//         loadAllPokemonBetween(searchNumber);
//     };
// }


async function loadAllPokemonBetween(searchPokeNr) {
    let beginPokeNr = pokemons.length;
    let endPokeNr = searchPokeNr + 1;
    for (let i = beginPokeNr; i < endPokeNr; i++) {
        await loadPokemonBy(i);
    }
    for (let i = 1; i < pokemonsLoaded.length; i++) {
        pokemons.push(
            {
                "pokeIds": [pokemonsLoaded[i]['pokeIds'][0]],
                "pokeNames": [pokemonsLoaded[i]['pokeNames'][0]],
                "pokeSlot1": [pokemonsLoaded[i]['pokeSlot1'][0]],
                "pokeSlot2": [pokemonsLoaded[i]['pokeSlot2'][0]],
                "pokeImg": [pokemonsLoaded[i]['pokeImg'][0]],
                "pokeWeight": [pokemonsLoaded[i]['pokeWeight'][0]],
            }
        )
    }
    for (let i = beginPokeNr; i < pokemons.length; i++) {
        searchingPoke = false;
        renderPokedex(i);
        pokemonsLoaded = [
            {
                "pokeIds": [],
                "pokeNames": [],
                "pokeSlot1": [],
                "pokeSlot2": [],
                "pokeImg": [],
                "pokeWeight": [],
            }
        ];
    }

    showSearchedPokemonBy(searchNumber);
    currentPokeNr = pokemons.length - 2;
    nextPokeNr = currentPokeNr + 1;
    lastPokeNr = currentPokeNr - 1;
}


// function checkIfPokemonInArray(searchNumber) {
//     for (let i = 0; i < pokemons.length; i++) {
//         if (pokes[i]['pokeIds'].includes(searchNumber) == true) {
//             return pokes[i]['pokeIds'].includes(searchNumber)
//         };
//     }
// }


function showSearchedPokemonBy(i) {
    let pokeNrToHide = currentPokeNr + 1
    document.getElementById('pokedex' + pokeNrToHide).style = 'transform: translateX(-100%)';
    document.getElementById('pokedex' + pokeNrToHide).style = 'z-index: -1';
    document.getElementById('pokedex' + i).style = 'transform: translateX(0%)';
    document.getElementById('pokedex' + i).style = 'z-index: 1';
    currentPokeNr = i - 1;
    lastPokeNr = currentPokeNr - 1;
    nextPokeNr = currentPokeNr + 1;
}