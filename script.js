let initEnd = 50;
let nextPokeNr = initEnd + 1;
let stepPokeNrs =  1;
let endPokeNr = nextPokeNr + stepPokeNrs;
let scrollCounter = 0;


function getData() {
    document.getElementById('myPlace').innerHTML = '';
    for (let i = 1; i <= initEnd; i++) {
        performServerRequests(i); 
    }
}


function getNextData() {
    for (let j = nextPokeNr;  j <= endPokeNr; j++) {
        performServerRequests(j);
    }
    updateCountNrs();
}


function updateCountNrs() {
    nextPokeNr = endPokeNr + 1;
    endPokeNr = nextPokeNr + stepPokeNrs;
}


async function performServerRequestBy(url) {
    try {
        dataByUrl = await fetchDataFromServer(url);
    } catch (error) {
        console.error('Fehler beim Ausführen des Serverzugriffs "dataByUrl":', error);
    }
}


async function fetchDataFromServer(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Fehler beim Abrufen der Daten:', error);
        throw error;
    }
}


async function performServerRequests(i) {
    try {
        let url1 = `https://pokeapi.co/api/v2/pokemon/${i}/`;
        let url2 = `https://pokeapi.co/api/v2/pokemon-species/${i}/`;
        let arrayPokemon = await fetchDataFromServer(url1);
        console.log(i + ' pokemonData:', arrayPokemon);
        let arrayPokemonSpecies = await fetchDataFromServer(url2);
        console.log(i + ' pokemon-speciesData:', arrayPokemonSpecies);
        getAbiltiesData(arrayPokemon, i);
        renderPokeMinis1st(i, arrayPokemon, arrayPokemonSpecies);
    } catch (error) {
        console.error('Fehler beim Ausführen der Serverzugriffe:', error);
    }
}


async function getAbiltiesData(arrayPokemon, i) {
    let dynamikUrl = await takeDynamikUrl(arrayPokemon);
    let arrayPokemonAbilities = await fetchAbilitiesDataFromServer(dynamikUrl);
    console.log(i + ' pokemon-abitiesData:', arrayPokemonAbilities);
}


async function takeDynamikUrl(arrayPokemon) {
    let dynamicUrlIndex = arrayPokemon['abilities'].length - 1;
    let dynamicUrl = arrayPokemon['abilities'][dynamicUrlIndex]['ability']['url'];
    return dynamicUrl;
}


async function fetchAbilitiesDataFromServer(url) {
    let response = await fetch(url);
    let arrayPokemonAbilities = await response.json();
    return arrayPokemonAbilities;
}

// onscroll

window.onscroll = function () { scrollFunction() };


async function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    scrollCounter++;
    let interval = 40;
    let tester = scrollCounter % interval;
    if (tester == 0) {
      getNextData();
    }
  }
}

// render PokeMinis

function renderPokeMinis1st(i, arrayPokemon, arrayPokemonSpecies) {
    let imgSrc = arrayPokemon['sprites']['other']['official-artwork']['front_shiny'];
    document.getElementById('myPlace').innerHTML += generateHTMLPokeMini(i, imgSrc); 
}

function generateHTMLPokeMini(i, imgSrc) {
    return `
    <div id="PokeMini${i}" class="PokeMini">
        <div id="PokeMiniImgDiv${i}" class="PokeMiniImgDiv">
            <img src=${imgSrc}>
        </div>
    </div>
    `
}
