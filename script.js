let initEnd = 20;
let nextPokeNr = initEnd + 1;
let stepPokeNrs = 1;
let endPokeNr = nextPokeNr + stepPokeNrs;
let scrollCounter = 0;
let maxPokeNr = 1010;
let currentPokeNr = 0;
let intervalId;


async function getData() {
    document.getElementById('myPlace').innerHTML = '';
    for (let i = 1; i <= initEnd; i++) {
        await performServerRequests(i);
        updateAmountPokesAndProgress(i);
    }
}


function getNextData() {
    if (nextPokeNr <= maxPokeNr) {
        for (let j = nextPokeNr; j <= endPokeNr; j++) {
            performServerRequests(j);
            updateAmountPokesAndProgress(j);
        }
        updateCountNrs();
    }
}


function startRepeatedExecution() {
    switchButton();
    intervalId = setInterval(getNextData, 5);
}


function stopRepeatedExecution() {
    switchButton();
    clearInterval(intervalId);
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
        renderPokeMinis1stLevel(i, arrayPokemon);
        stylePokeBgn(i, arrayPokemon);
        let arrayPokemonSpecies = await fetchDataFromServer(url2);
        console.log(i + ' pokemon-speciesData:', arrayPokemonSpecies);
        getAbiltiesData(arrayPokemon, i);
    } catch (error) {
        console.error('Fehler beim Ausführen der Serverzugriffe:', error);
    }
}


async function getAbiltiesData(arrayPokemon, i) {
    let dynamikUrl = await takeDynamikUrl(arrayPokemon);
    let arrayPokemonAbilities = await fetchAbilitiesDataFromServer(dynamikUrl);
    console.log(i + ' pokemon-abitiesData:', arrayPokemonAbilities);
}


function takeDynamikUrl(arrayPokemon) {
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


function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        scrollCounter++;
        let interval = 1;
        let tester = scrollCounter % interval;
        if (tester == 0) {
            // getNextData();
        }
    }
}

// render PokeMinis

async function renderPokeMinis1stLevel(i, arrayPokemon) {
    let imgSrc = arrayPokemon['sprites']['other']['official-artwork']['front_shiny'];
    let pokeId = arrayPokemon['id'];
    let pokeName = arrayPokemon['name'];
    document.getElementById('myPlace').innerHTML += generateHTMLPokeMini(i, imgSrc, pokeId, pokeName);
}


function generateHTMLPokeMini(i, imgSrc, pokeId, pokeName) {
    return `
    <div id="pokeMini${i}" class="pokeMini">
        <div id="pokeMini1stLine${i}" class="pokeMini1stLine">
            <div id="pokeMiniId${i}" class="pokeMiniId">${pokeId}</div>
            <div id="pokeMiniName${i}" class="pokeMiniName">${pokeName}</div>
        </div>
        <div id="pokeMiniImgDiv${i}" class="pokeMiniImgDiv">
            <img src=${imgSrc}>
        </div>
    </div>
    `
}


// progressBar


function updateAmountPokesAndProgress(currentPokeNr) {
    renderAmountLoadedPokes(currentPokeNr);
    updateProgress(currentPokeNr);
}


function renderAmountLoadedPokes(currentPokeNr) {
    document.getElementById('amount-pokes-loaded').innerHTML = '';
    document.getElementById('amount-pokes-loaded').innerHTML = generateHTMLAmountLoadedPokes(currentPokeNr);
}


function generateHTMLAmountLoadedPokes(currentPokeNr) {
    return 'Es wurden ' + currentPokeNr + ' von 1010 geladen';
}


function updateProgress(currentPokeNr) {
    let progressWidth = currentPokeNr / maxPokeNr * 100;
    document.getElementById('progress').style = `width: ${progressWidth}%`;
}


// background-color



async function stylePokeBgn(currentPokeNr, arrayPokemon) {
    let pokeType = arrayPokemon['types'][0]['type']['name'];
    setBgnByType(pokeType, currentPokeNr);
}


function setBgnByType(pokeType, i) {
    document.getElementById('pokeMini' + i).classList.add('bgn-type-' + pokeType);
}


// switch button


function switchButton() {
    let loadBtnStop = document.getElementById('loadBtnStop');
    let loadBtnStart = document.getElementById('loadBtnStart');
    if (loadBtnStop.classList.contains('display-none') == true) {
        displayOn(loadBtnStop);
        displayOff(loadBtnStart);
    } else {
        displayOff(loadBtnStop);
        displayOn(loadBtnStart);
    }
}


function displayOn(element) {
    element.classList.remove('display-none');
    element.classList.add('display-flex');
}


function displayOff(element) {
    element.classList.add('display-none');
    element.classList.remove('display-flex');
}