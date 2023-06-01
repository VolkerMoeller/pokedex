let initEnd = 20;
let nextPokeNr = initEnd + 1;
let stepPokeNrs = 19;
let endPokeNr = nextPokeNr + stepPokeNrs;
let maxPokeNr = 1010;
let currentPokeNr = 0
let indexOfGermanData;
let functionRunning = false;
let loadedPokeNames = [];
let loadedPokeIds = [];
let loadedPokeSlots1 = [];
let loadedPokeSlots2 = [];
let pokesFavorites = [];


function init() {
    loadedPokeNames = [];
    loadedPokeIds = [];
    document.getElementById('myPlace').innerHTML = '';
    getData(1, initEnd);
}


function initNext() {
    getData(nextPokeNr, endPokeNr);
}


async function getData(begin, end) {
    if (!functionRunning) {
        functionRunning = true;
        for (let i = begin; i <= end; i++) {
            await performServerRequests(i);
            updateAmountPokesAndProgress(i);
        }
        updateCountNrs(end);
        functionRunning = false;
    }
}


function updateCountNrs(end) {
    nextPokeNr = end + 1;
    endPokeNr = nextPokeNr + stepPokeNrs;
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
        await fetchArrayPokemon(i, url1);
        await fetchArrayPokemonSpecies(i, url2);
    } catch (error) {
        console.error('Fehler beim Ausführen der Serverzugriffe:', error);
    }
}


async function fetchArrayPokemon(i, url1) {
    let arrayPokemon = await fetchDataFromServer(url1);
    console.log(i + ' pokemonData:', arrayPokemon);
    useArrayPokemon(i, arrayPokemon);
}


async function useArrayPokemon(i, arrayPokemon) {
    await renderPokeMinis1stLevel(i, arrayPokemon);
    await stylePokeBgn(i, arrayPokemon, 'pokeMini');
    await getAbiltiesData(i, arrayPokemon);
    await changeMiniToBlack(i, arrayPokemon);
    await noticeDisplayedPokeId(i, arrayPokemon);
    await noticeDisplayedPokeSlots(i, arrayPokemon);
    await renderPokeCards1stLevel(i, arrayPokemon);
    await stylePokeBgn(i, arrayPokemon, 'pokedex');
    // await renderPokeCards2ndLevel(i, arrayPokemon);
}


async function noticeDisplayedPokeId(i, arrayPokemon) {
    let pokeId = arrayPokemon['id'];
    pokeId = pokeId.toString();
    loadedPokeIds.push(pokeId);
}


async function noticeDisplayedPokeSlots(i, arrayPokemon) {
    if (arrayPokemon['types'].length == 1) {
        let pokeSlot1 = arrayPokemon['types'][0]['type']['name'];
        let pokeSlot2 = '';
        loadedPokeSlots1.push(pokeSlot1);
        loadedPokeSlots2.push(pokeSlot2);
    } else
        if (arrayPokemon['types'].length == 2) {
            let pokeSlot1 = arrayPokemon['types'][0]['type']['name'];
            let pokeSlot2 = arrayPokemon['types'][1]['type']['name'];
            loadedPokeSlots1.push(pokeSlot1);
            loadedPokeSlots2.push(pokeSlot2);
        }
}


async function noticeDisplayedPokeSlot2(i, arrayPokemon) {
    if (arrayPokemon['types'].length = 2) {
        let pokeSlot1 = arrayPokemon['types'][0]['type']['name'];
        loadedPokeSlots1.push(pokeSlot1);
        let pokeSlot2 = arrayPokemon['types'][1]['type']['name'];
        loadedPokeSlots2.push(pokeSlot2);
    }
}


async function fetchArrayPokemonSpecies(i, url2) {
    let arrayPokemonSpecies = await fetchDataFromServer(url2);
    console.log(i + ' pokemon-speciesData:', arrayPokemonSpecies);
    await renderPokeMinis2ndLevel(i, arrayPokemonSpecies);
}


async function getAbiltiesData(i, arrayPokemon) {
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


// render PokeMinis
async function renderPokeMinis1stLevel(i, arrayPokemon) {
    let imgSrc = arrayPokemon['sprites']['other']['official-artwork']['front_shiny'];
    let pokeId = arrayPokemon['id'];
    document.getElementById('myPlace').innerHTML += generateHTMLPokeMini1st(i, imgSrc, pokeId);
}


function generateHTMLPokeMini1st(i, imgSrc, pokeId) {
    return /*html*/`
    <button id="pokeButton${i}" class="pokeButton" onclick="showPokeCard(${i})">
        <div id="pokeMini${i}" class="pokeMini">
            <div id="pokeMini1stLine${i}" class="pokeMini1stLine">
                <div id="pokeMiniId${i}" class="pokeMiniId">${pokeId}</div>
                <div id="pokeMiniGermanName${i}" class="pokeMiniName"></div>
            </div>
        <div id="pokeMiniImgDiv${i}" class="pokeMiniImgDiv">
            <img src=${imgSrc}>
        </div>
        </div>
    </button>
    `
}

function showPokeCard(i) {
    switchContent();
    document.getElementById('pokedex' + i).classList.remove('display-none');
}

function hideAllPokeCards() {
    for (let i = 1; i < loadedPokeIds.length; i++) {
        document.getElementById('pokedex' + i).classList.add('display-none');
    }
}



async function renderPokeMinis2ndLevel(i, arrayPokemonSpecies) {
    searchIndexOfGermanData(arrayPokemonSpecies, 'names');
    let germanName = arrayPokemonSpecies['names'][indexOfGermanData]['name'];
    console.log(germanName);
    await noticeDisplayedPokeName(germanName);
    document.getElementById('pokeMiniGermanName' + i).innerHTML = germanName;
}


async function noticeDisplayedPokeName(germanName) {
    let pokeName = germanName;
    loadedPokeNames.push(pokeName);
}


async function changeMiniToBlack(i, arrayPokemon) {
    let slot1 = arrayPokemon['types'][0]['type']['name'];
    if (slot1 == 'electric' || slot1 == 'ice') {
        document.getElementById('pokeMiniGermanName' + i).classList.add(`color-black`);
        document.getElementById('pokeMiniId' + i).classList.add(`color-black`);
    }
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
async function stylePokeBgn(currentPokeNr, arrayPokemon, index) {
    let pokeType = arrayPokemon['types'][0]['type']['name'];
    setBgnByType(pokeType, currentPokeNr, index);
}


function setBgnByType(pokeType, i, index) {
    document.getElementById(index + i).classList.add('bgn-type-' + pokeType);
}


// switch PokeCard-Overlay 
function switchContent() {
    let overlay = document.getElementById('overlay');
    let pokeCardContent = document.getElementById('pokeCardContent');
    if (overlay.classList.contains('display-none') == true) {
        displayOn(overlay);
        displayOn(pokeCardContent);
    } else {
        displayOff(overlay);
        displayOff(pokeCardContent);
        hideAllPokeCards();
    }
    topFunction();
}


// display OnOff
function displayOn(element) {
    element.classList.remove('display-none');
    element.classList.add('display-flex');
}


function displayOff(element) {
    element.classList.add('display-none');
    element.classList.remove('display-flex');
}


//  onTop
function topFunction() {
    document.documentElement.scrollTop = 0;
}


//  germanData
function searchIndexOfGermanData(arrayAsJSON, index) {
    for (let j = 0; j < arrayAsJSON[index].length; j++) {
        const language = arrayAsJSON[index][j]['language']['name'];
        if (language == 'de') {
            indexOfGermanData = j;
            return indexOfGermanData;
        }
    }
}


// searchBy
function searchByName() {
    hidePokeMinis();
    for (let i = 0; i < loadedPokeNames.length; i++) {
        let searchName = document.getElementById('searchName').value;
        searchName = searchName.toLowerCase();
        let loadedPokeName = loadedPokeNames[i].toLowerCase();
        let result = loadedPokeName.startsWith(searchName);
        if (result == true) {
            document.getElementById('pokeButton' + loadedPokeIds[i]).classList.remove('display-none')
        }
    }
}


function searchByNr() {
    hidePokeMinis();
    for (let i = 0; i < loadedPokeIds.length; i++) {
        let searchId = document.getElementById('searchId').value;
        searchId = searchId.toString();
        let result = loadedPokeIds[i].startsWith(searchId);
        if (result == true) {
            document.getElementById('pokeButton' + loadedPokeIds[i]).classList.remove('display-none')
        }
    }
}


// hide PokeMinis
function hidePokeMinis() {
    for (let i = 0; i < loadedPokeIds.length; i++) {
        document.getElementById('pokeButton' + loadedPokeIds[i]).classList.add('display-none')
    }
}


// render pokeCards 1st
async function renderPokeCards1stLevel(i) {
    document.getElementById('pokeCardPlace').classList.remove('display-none');
    document.getElementById('pokeCardPlace').innerHTML += generateHTMLPokeCard(i);
}

function generateHTMLPokeCard(i) {
    return /*html*/`
    <div id="pokedex${i}" class="pokedex display-none">
        <div id="pokedex-top${i}" class="pokedex-top">
            <div>
                <button onclick="switchContent()" class="btn-back">
                    <img src="./img/backspace.png">
                </button>
            </div>
            <div class="pokedex-above">
                <div id="pokedex-name${i}" class="pokedex-name">
                </div>
                <div id="pokedex-id${i}" class="pokedex-id">
                </div>
            </div>
            <div class="slot-line">
                <div id="pokedex-slots${i}" class="pokedex-slots">
                </div>
                <div class="favorite">
                    <div id="fill0${i}"><button id="btn-fill0${i}" class="btn-fav" onclick="setFavorite(${i})"><img id="pokeImgFavFill0${i}" src="./img/favorite_FILL0.png"></button></div>
                    <div id="fill1${i}" class="display-none"><button id="btn-fill1${i}"class="btn-fav" onclick="setFavorite(${i})"><img id="pokeImgFavFill1${i}" src="./img/favorite_FILL1.png"></button></div>
                </div>
            </div>
        </div>
        <div id="pokedex-bottom${i}" class="pokedex-bottom">
        <div class="navigationPoke">
            <div onmouseover="hoverNavigationOver(1, ${i})" onmouseout="hoverNavigationOut(1, ${i})">
                <button onclick="showCurrentCardById('card1${i}', ${i}, cardIdsPokeAll)" id="btn-card1${i}">About</button>
            </div>
            <div onmouseover="hoverNavigationOver(2, ${i})" onmouseout="hoverNavigationOut(2, ${i})">
                <button onclick="showCurrentCardById('card2${i}', ${i}, cardIdsPokeAll)" id="btn-card2${i}">Base Stats</button>
            </div>
            <div onmouseover="hoverNavigationOver(3, ${i})" onmouseout="hoverNavigationOut(3, ${i})">
                <button onclick="showCurrentCardById('card3${i}', ${i}, cardIdsPokeAll)" id="btn-card3${i}">Evolution</button>
            </div>
            <div onmouseover="hoverNavigationOver(4, ${i})" onmouseout="hoverNavigationOut(4, ${i})">
                <button onclick="showCurrentCardById('card4${i}', ${i}, cardIdsPokeAll)" id="btn-card4${i}">5 Moves</button>
            </div>
        </div>
        <div id="card1${i}" class="cards"></div>
        <div id="card2${i}" class="cards display-none"></div>
        <div id="card3${i}" class="cards display-none"></div>
        <div id="card4${i}" class="cards display-none"></div>
    </div> 
    `
}

// favorites
function setFavorite(i) {
    let hidden = document.getElementById(`fill0${i}`).classList.contains('display-none');
    if (hidden == true) {
        document.getElementById(`fill0${i}`).classList.remove('display-none');
        document.getElementById(`fill1${i}`).classList.add('display-none');
        removeFavorite(i);

    } else {
        document.getElementById(`fill0${i}`).classList.add('display-none');
        document.getElementById(`fill1${i}`).classList.remove('display-none');
        addFavorite(i);
    }
}


function addFavorite(i) {
    pokesFavorites.push(i);
    pokesFavorites.sort(function (a, b) { return a - b });
    saveFavorites();
    loadFavorites();
}


function removeFavorite(i) {
    let index = pokesFavorites.indexOf(i);
    pokesFavorites.splice(index, 1);
    saveFavorites();
    loadFavorites();
}


function saveFavorites() {
    let pokesFavoritesAsText = JSON.stringify(pokesFavorites);
    localStorage.setItem('pokesFavorites', pokesFavoritesAsText);
}


function loadFavorites() {
    let pokesFavoritesAsText = localStorage.getItem('pokesFavorites');
    if (pokesFavoritesAsText) {
        pokesFavorites = JSON.parse(pokesFavoritesAsText);
    }
}


// Navigation PokeCard
function hoverNavigationOver(cardNr, i) {
    let slot1 = loadedPokeSlots1[i];
    let bgnHoverType = 'bgn-hover-type-' + slot1;
    document.getElementById('btn-card' + cardNr + i).classList.add(`${bgnHoverType}`);
}


function hoverNavigationOut(cardNr, i) {
    let slot1 = loadedPokeSlots1[i];
    let bgnHoverType = 'bgn-hover-type-' + slot1;
    document.getElementById('btn-card' + cardNr + i).classList.remove(`${bgnHoverType}`);
}

// render pokeCards 2nd
async function renderPokeCards2ndLevel(i, arrayPokemon) {
    await renderPokeTop(i, arrayPokemon);
    // await renderPokeBottom(i);
    // await stylePokeBgnTop(i);
    // await renderPokeBottomNavigation(i);
}

async function renderPokeTop(i, arrayPokemon) {
    let pokeSlot1 = arrayPokemon['types'][0]['type']['name'];
    let bgnSlotType = 'bgn-slot-type-' + pokeSlot1;
    let bgnType = 'bgn-type-' + pokeSlot1;
    let pokeImg = arrayPokemon['sprites']['other']['official-artwork']['front_shiny'];
    renderPokeGermanName(i);
    renderPokeId(i);
    renderPokeSlot1(i, bgnSlotType, pokeSlot1);
    renderPokeSlot2(i);
    renderPokeFavorite(i, bgnType);
    renderPokeImage(i, pokeImg);
    renderPokeToBlack(i, pokeSlot1);
}


function renderPokeGermanName(i) {
    let pokeNameGerman = myPokesAsObject[i]['nameGerman'];
    document.getElementById('pokedex-name' + i).innerHTML += `<h1>${pokeNameGerman}</h1>`;
};


function renderPokeToBlack(i, pokeSlot1){
    if (pokeSlot1 == 'electric' || pokeSlot1 == 'ice') {
        changeToBlack(i, pokeSlot1);
    }
};


function renderPokeSlot2(i) {
    if (myPokesAsObject[i]['slot2']) {
        let pokeSlot2 = myPokesAsObject[i]['slot2'];
        let bgnSlotType = 'bgn-slot-type-' + pokeSlot2;
        document.getElementById('pokedex-slots' + i).innerHTML += `<div class="slot ${bgnSlotType}">${pokeSlot2}</div>`;
    } else {
    }
};


function renderPokeImage(i, pokeImg) {
    document.getElementById('pokedex-top' + i).innerHTML += `<div id="pokeImg"><img src="${pokeImg}"></div>`;
};


function renderPokeSlot1(i, bgnSlotType, pokeSlot1) {
    document.getElementById('pokedex-slots' + i).innerHTML += `<div id="base-type${i}" class="slot ${bgnSlotType}">${pokeSlot1}</div>`;
};


function renderPokeFavorite(i, bgnType) {
    document.getElementById('btn-fill0' + i).classList.add(`${bgnType}`);
    document.getElementById('btn-fill1' + i).classList.add(`${bgnType}`);
};


function renderPokeId(i) {
    let pokeId = myPokesAsObject[i]['id'];
    let formatPokeId = format3LeftHandZeros(pokeId);
    document.getElementById('pokedex-id' + i).innerHTML += `<div># ${formatPokeId}</div>`;
};


function changeToBlack(i, pokeSlot1) {
    let bgnSlotType = 'bgn-slot-type-' + pokeSlot1;
    document.getElementById('pokeImgFavFill0' + i).classList.add(`${bgnSlotType}`);
    document.getElementById('pokeImgFavFill1' + i).classList.add(`${bgnSlotType}`);
    document.getElementById('pokedex-name' + i).classList.add('color-black');
    document.getElementById('pokedex-id' + i).classList.add('color-black');
    document.getElementById('pokedex-slots' + i).classList.add('color-black');
    document.getElementById('amount-pokes-loaded' + i).classList.add('color-black');
    document.getElementById('searchByNameLine' + i).classList.add('color-black');
    for (let j = 1; j <= 4; j++) {
        document.getElementById('btn-card' + j + i).classList.add('color-black');
    }
}


async function renderPokeBottomNavigation(i) {
    let pokeSlot1 = myPokesAsObject[i]['slot1'];
    let bgnSlotType = 'bgn-type-' + pokeSlot1;
    let bgnActiveType = 'bgn-slot-type-' + pokeSlot1;
    for (let k = 1; k <= cardIdsPokeAll.length; k++) {
        document.getElementById('btn-card' + k + i).classList.add(`${bgnSlotType}`);
    }
    document.getElementById('btn-card' + 1 + i).classList.remove(`${bgnSlotType}`);
    document.getElementById('btn-card' + 1 + i).classList.add(`${bgnActiveType}`);
}


async function renderPokeBottom(i) {
    renderPokeCardAbout(i);
    renderPokeCardBaseStats(i);
    renderPokeCardEvolution(i);
    renderPokeCardMoves(i);
}


// async function stylePokeBgnTop(i) {
//     let pokeType = document.getElementById('base-type' + i).innerHTML;
//     setBgnByType(pokeType, i);
// }


// function setBgnByType(pokeType, i) {
//     document.getElementById('pokedex-top' + i).classList.add('bgn-type-' + pokeType);
// }