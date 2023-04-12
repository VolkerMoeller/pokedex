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


function initPokemon() {
    document.getElementById('pokedex-all').innerHTML = '';
    getFivePokemon();
}


function getFivePokemon() {
    if (pokemons.length >= 0) {
        let pokeId = pokemons.length;
        for (let i = 0; i < 5; i++) {
            loadPokemonByInput(pokeId);
            pokeId++;
        }
    } else {
        let pokeId = 0;
        for (let i = 0; i < 5; i++) {
            loadPokemonByInput(pokeId);
            pokeId++;
        }
    }
}



async function loadPokemonByInput(pokeId) {
    let url = `https://pokeapi.co/api/v2/pokemon/${pokeId}`;
    let response = await fetch(url);
    let responseAsJSON = await response.json();
    currentPokemon = responseAsJSON;
    // console.log('CurrentPokemon:', currentPokemon);
    addCurrentPokemon();
    renderPokedex(pokeId);
}


function renderPokedex(pokeId) {
    document.getElementById('pokedex-all').innerHTML += generateHTMLPokedex(pokeId);
    renderPokedexTop(pokeId);
    stylePokedexBgnTop(pokeId);
    renderPokedexBottom(pokeId);
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
     <div id="pokedex${i}">
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
    let pokeName = currentPokemon['name'];
    document.getElementById('pokedex-name' + i).innerHTML += `<h1>${pokeName}</h1>`;
    let pokeId = currentPokemon['id'];
    document.getElementById('pokedex-id' + i).innerHTML += `<div># ${pokeId}</div>`;
    let pokeSlot1 = currentPokemon['types'][0]['type']['name'];
    document.getElementById('pokedex-slots' + i).innerHTML += `<div id="base-type${i}" class="slot">${pokeSlot1}</div>`;
    let pokeImg = currentPokemon['sprites']['other']['home']['front_default'];
    if (currentPokemon['types'].length == 2) {
        let pokeSlot2 = currentPokemon['types'][1]['type']['name'];
        document.getElementById('pokedex-slots' + i).innerHTML += `<div class="slot">${pokeSlot2}</div>`;
    }
    document.getElementById('pokedex-top' + i).innerHTML += `<div id="pokeImg"><img src="${pokeImg}"></div>`;
}


function renderPokedexBottom(i) {
    let pokeWeight = currentPokemon['weight'];
    document.getElementById('pokedex-bottom' + i).innerHTML += `Gewicht: ${pokeWeight}`;
}