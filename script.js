let currentPokemon = [];

function initPokemon() {
    document.getElementById('pokedex-all').innerHTML = '';
    for (let i = 1; i < 40; i++) {
        loadPokemonByInput(i);
    }
}


async function loadPokemonByInput(pokeId) {
    let url = `https://pokeapi.co/api/v2/pokemon/${pokeId}`;
    let response = await fetch(url);
    let responseAsJSON = await response.json();
    currentPokemon = responseAsJSON;
    console.log('CurrentPokemon:', currentPokemon);
    renderPokedex(pokeId);
}


function renderPokedex(pokeId) {
    document.getElementById('pokedex-all').innerHTML += generateHTMLPokedex(pokeId);
    renderPokedexTop(pokeId);
    renderPokedexBottom(pokeId);
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


function renderPokedexTop(i) {
    let pokeName = currentPokemon['name'];
    document.getElementById('pokedex-name' + i).innerHTML += `<h1>${pokeName}</h1>`;
    let pokeId = currentPokemon['id'];
    document.getElementById('pokedex-id' + i).innerHTML += `<div># ${pokeId}</div>`;
    let pokeSlot1 = currentPokemon['types'][0]['type']['name'];
    document.getElementById('pokedex-slots' + i).innerHTML += `<div class="slot">${pokeSlot1}</div>`;
    if (currentPokemon['types'].length == 2) {
        let pokeSlot2 = currentPokemon['types'][1]['type']['name'];
        document.getElementById('pokedex-slots' + i).innerHTML += `<div class="slot">${pokeSlot2}</div>`;
    }
    let pokeImg = currentPokemon['sprites']['other']['home']['front_default'];
    document.getElementById('pokedex-top' + i).innerHTML += `<div id="pokeImg"><img src="${pokeImg}"></div>`;

}

function renderPokedexBottom(i) {
    let pokeWeight = currentPokemon['weight'];
    document.getElementById('pokedex-bottom' + i).innerHTML += `Gewicht: ${pokeWeight}`;
}