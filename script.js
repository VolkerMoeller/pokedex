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
let currentPokeNr = 0;
let lastPokeNr = currentPokeNr - 1;
let nextPokeNr = currentPokeNr + 1;


function initPokemon() {
    document.getElementById('pokedex-all').innerHTML = '';
    loadPokemonBy(nextPokeNr);
}


function getNextPokemon() {
    currentPokeNr++;
    lastPokeNr++;
    nextPokeNr++;
    if (nextPokeNr >= pokemons.length) {
        document.getElementById('pokedex' + currentPokeNr).style = 'transform: translateX(-100%)';
        loadPokemonBy(nextPokeNr); 
    } 
    else {
        document.getElementById('pokedex' + currentPokeNr).style = 'transform: translateX(-100%)';
        document.getElementById('pokedex' + nextPokeNr).style = 'transform: translateX(0%)';
        // lastPokeNr--;
        // currentPokeNr--;
        // nextPokeNr--;  
    }
}



async function loadPokemonBy(currentPokeNr) {
    let url = `https://pokeapi.co/api/v2/pokemon/${currentPokeNr}`;
    let response = await fetch(url);
    let responseAsJSON = await response.json();
    currentPokemon = responseAsJSON;
    // console.log('CurrentPokemon:', currentPokemon);
    addCurrentPokemon()
    renderPokedex(currentPokeNr);
}


function renderPokedex(i) {
    document.getElementById('pokedex-all').innerHTML += generateHTMLPokedex(i);
    renderPokedexTop(i);
    stylePokedexBgnTop(i);
    renderPokedexBottom(i);
}


function showNextPokedex() {
    getNextPokemon();
}

function showLastPokedex() {
    if (currentPokeNr > 0) {
        document.getElementById('pokedex' + currentPokeNr).style = 'transform: translateX(0%)';
        document.getElementById('pokedex' + nextPokeNr).style = 'transform: translateX(100%)';
        currentPokeNr--;
        lastPokeNr--;
        nextPokeNr--;
    }
}


function stylePokedexBgnTop(i) {
    let pokeType = document.getElementById('base-type' + i).innerHTML;
    setBgnByType(pokeType, i);

}


function setBgnByType(pokeType, i) {
    document.getElementById('pokedex-top' + i).classList.add('bgn-color-type-' + pokeType);
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


function generateHTMLPokedex(i) {
    return `
        <div id="pokedex${i}" class="pokedex">
            <div id="pokedex-top${i}" class="pokedex-top">SERVER LÄDT
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