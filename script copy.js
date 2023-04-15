let pokemons = [
    {
        "pokeIds": [],
        "pokeNames": [],
        "pokeSlot1": [],
        "pokeSlot2": [],
        "pokeImg": [],
        "pokeWeight": [],
    }
];

let currentPokemon = [];
let timeOutNext = 0;
let currentShownPokemonNr = 1;
let currentPokeNr;

function initPokemon() {
    getFivePokemon();
}


function getFivePokemon() {
    currentPokeNr = pokemons.length;
    for (let i = 0; i < 5; i++) {
        loadPokemonBy(currentPokeNr);
        currentPokeNr++;
    }
}


async function loadPokemonBy(currentPokeNr) {
    let url = `https://pokeapi.co/api/v2/pokemon/${currentPokeNr}`;
    let response = await fetch(url);
    let responseAsJSON = await response.json();
    currentPokemon = responseAsJSON;
    // console.log('CurrentPokemon:', currentPokemon);
    addCurrentPokemon();
    sortPokemons();
    setTimeout(function () { renderPokedex(); }, timeOutNext);
}

function showPokedex() {
    let currentPokemonId = document.getElementById('pokedex' + currentShownPokemonNr);
    if (currentPokemonId) {
        document.getElementById('pokedex' + currentShownPokemonNr).classList.remove('display-none');
    } else {
        console.log('keine weiteren Pokemons');
        currentShownPokemonNr = 1;
    }
}

function sortPokemons() {
    pokemons.sort(function (a, b) { return a.pokeIds - b.pokeIds });
}

function renderPokedex() {
    document.getElementById('pokedex-all').innerHTML = '';
    for (let i = 0; i < pokemons.length; i++) {
        document.getElementById('pokedex-all').innerHTML += generateHTMLPokedex(i);
        renderPokedexTop(i);
        stylePokedexBgnTop(i);
        renderPokedexBottom(i);
    }
    if (pokemons.length >= 5) {
        timeOutNext = 4000;
    }
}

function startPokedex() {
    showPokedex();
}

function showNextPokedex() {
    document.getElementById('pokedex' + currentShownPokemonNr).classList.add('display-none');
    currentShownPokemonNr++;
    showPokedex();
}

function stylePokedexBgnTop(i) {
    let pokeType = document.getElementById('base-type' + i).innerHTML;
    setBgnByType(pokeType, i);

}

function setBgnByType(pokeType, i) {
    document.getElementById('pokedex-top' + i).classList.add('bgn-color-type-' + pokeType);
}



function generateHTMLPokedex(i) {
    return `
    <div id="pokedex${i}" class="pokedex display-none">
        <div id="pokedex-top${i}" class="pokedex-top">
            <div>
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


function addCurrentPokemon() {
    let pokeId = currentPokemon['id'];
    let pokeName = currentPokemon['name'];
    let pokeImg = currentPokemon['sprites']['other']['home']['front_default'];
    let pokeSlot1 = currentPokemon['types'][0]['type']['name'];
    let pokeSlot2 = '';
    if (currentPokemon['types'].length == 2) {
        pokeSlot2 = currentPokemon['types'][1]['type']['name'];
    } else {
        pokeSlot2 = 'none';
    }
    let pokeWeight = currentPokemon['weight'];
    pokemons.push(
        {
            "pokeIds": [pokeId],
            "pokeNames": [pokeName],
            "pokeSlot1": [pokeSlot1],
            "pokeSlot2": [pokeSlot2],
            "pokeImg": [pokeImg],
            "pokeWeight": [pokeWeight],
        }
    )
}


function renderPokedexTop(i) {
    let pokeName = pokemons[i]['pokeNames'];
    document.getElementById('pokedex-name' + i).innerHTML += `<h1>${pokeName}</h1>`;
    let pokeId = pokemons[i]['pokeIds'];
    document.getElementById('pokedex-id' + i).innerHTML += `<div># ${pokeId}</div>`;
    let pokeSlot1 = pokemons[i]['pokeSlot1'];
    document.getElementById('pokedex-slots' + i).innerHTML += `<div id="base-type${i}" class="slot">${pokeSlot1}</div>`;
    let pokeImg = pokemons[i]['pokeImg'];
    document.getElementById('pokedex-top' + i).innerHTML += `<div id="pokeImg"><img src="${pokeImg}"></div>`;
    if (pokemons[i]['pokeSlot2'] == 'none') {
    } else {
        let pokeSlot2 = pokemons[i]['pokeSlot2'];
        document.getElementById('pokedex-slots' + i).innerHTML += `<div class="slot">${pokeSlot2}</div>`;
    }
}



function renderPokedexBottom(i) {
    let pokeWeight = pokemons[i]['pokeWeight'];
    document.getElementById('pokedex-bottom' + i).innerHTML += `Gewicht: ${pokeWeight}`;
}


function nextFivePokemon() {
    getFivePokemon();
}