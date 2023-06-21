let initEnd = 4;
let nextPokeNr = initEnd + 1;
let stepPokeNrs = 19;
let endPokeNr = nextPokeNr + stepPokeNrs;
let maxPokeNr = 1010;
let currentPokeNr = 0

let indexOfGermanData;
let functionRunning = false;

let loadedPokeIds = [];
let loadedPokeNames = [];
let loadedPokeSlots1 = [];
let loadedPokeSlots2 = [];
let pokesFavorites = [];

let lastCard = 0;

let amountCards = 2

let statNames = ['Kraftpunkte:', 'Angriff:', 'Verteidigung:', 'Spezialangriff:', 'Spezialverteid.:', 'Initiative'];
let statIds = ['hp', 'attack', 'defence', 'special-attack', 'special-defence', 'speed'];

let colorBlackIds = ['pokedex-name', 'pokedex-id', 'base-type1', 'base-type2', 'btn-card1', 'btn-card2'];

let aboutRowIds = ['genera', 'weight', 'height', 'ability', 'text'];
let aboutNameIds = ['generaName', 'weightName', 'heightName', 'abilityName', 'textName'];
let aboutValueIds = ['generaValue', 'weightValue', 'heightValue', 'abilityValue', 'textValue'];
let aboutTitles = ['Klasse:', 'Gewicht:', 'Höhe:', 'Fähigkeit:', ''];

let counter = 0;

async function init() {
    loadFavorites();
    loadedPokeNames = [];
    loadedPokeIds = [];
    document.getElementById('myPlace').innerHTML = '';
    await getData(1, initEnd);
}


function initNext() {
    clearSearchInput();
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


async function performServerRequests(i) {
    let url1 = `https://pokeapi.co/api/v2/pokemon/${i}/`;
    let url2 = `https://pokeapi.co/api/v2/pokemon-species/${i}/`;
    let arr = await fetchDataFromServer(url1);
    let arrAbi = await fetchDataByDynamikUrl(arr, 'abilities', '', 'ability');
    let arrType1st = await fetchDataByDynamikUrl(arr, 'types', 0, 'type');
    let arrType2nd = '';
    if (arr['types'].length == 2) {
        arrType2nd = await fetchDataByDynamikUrl(arr, 'types', 1, 'type');
    }
    let arrSpec = await fetchDataFromServer(url2);
    await useArrays(i, arr, arrAbi, arrSpec, arrType1st, arrType2nd);
}


async function fetchDataFromServer(url) {
    let response = await fetch(url);
    let data = await response.json();
    return data;
}


async function fetchDataByDynamikUrl(array, indexAll, position, indexOne) {
    let dynamikUrl = takeDynamikUrl(array, indexAll, position, indexOne);
    let data = await fetchDataFromServer(dynamikUrl);
    return data;
}


function takeDynamikUrl(array, index1st, position, index2nd) {
    if (index1st == 'color') {
        let dynamicUrl = array[index1st]['url'];
        return dynamicUrl;
    }
    if (index1st == 'types') {
        let dynamicUrl = array[index1st][position][index2nd]['url'];
        return dynamicUrl;
    }
    if (index1st == 'abilities') {
        let dynamicUrlIndex = array[index1st].length - 1;
        let dynamicUrl = array[index1st][dynamicUrlIndex][index2nd]['url'];
        return dynamicUrl;
    }
}


async function useArrays(i, arr, arrAbi, arrSpec, arrType1st, arrType2nd) {
    console.log(i + ' Pokemon ', arr);
    console.log(i + ' PokemonAbilities ', arrAbi);
    console.log(i + ' PokemonSpecies ', arrSpec);
    console.log(i + ' PokemonType1 ', arrType1st);
    console.log(i + ' PokemonType2 ', arrType2nd);
    await noticeData(i, arr, arrSpec);
    await render(i, arr, arrAbi, arrSpec, arrType1st, arrType2nd);
    await fill(i, arr);
}


function getGermanData(array, index1st, index2nd) {
    let indexGermanData = searchIndexOfGermanData(array, index1st);
    let germanData = array[index1st][indexGermanData][index2nd];
    return germanData;
}


function searchIndexOfGermanData(array, index) {
    for (let j = 0; j < array[index].length; j++) {
        const language = array[index][j]['language']['name'];
        if (language == 'de') {
            let indexGermanData = j;
            j = array[index].length;
            return indexGermanData;
        }
    }
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

// render
async function render(i, arrPoke, arrPokeAbi, arrPokeSpec, arrPokeType1st, arrPokeType2nd) {
    renderPokeMini(i, arrPoke);
    renderPokeCard(i, arrPoke, arrPokeAbi, arrPokeSpec, arrPokeType1st, arrPokeType2nd);
}


async function renderPokeMini(i, arrPoke) {
    document.getElementById('myPlace').innerHTML += generateHTMLPokeMini(i);
    stylePokeBgn(i, arrPoke, 'pokeMini');
    changeMiniToBlack(i, arrPoke);
}


function renderPokeCard(i, arrPoke, arrPokeAbi, arrPokeSpec, arrPokeType1st, arrPokeType2nd) {
    let slot = arrPoke['types'][0]['type']['name'];
    document.getElementById('pokeCardPlace').innerHTML += generateHTMLPokeCard(i, slot);
    stylePokeBgn(i, arrPoke, 'pokedex');
    changeCardToBlack(i, arrPoke);
    renderPokeTop(i, arrPoke);
    renderSlots(i, arrPoke, arrPokeType1st, arrPokeType2nd);
    renderPokeNavigation(i, arrPoke);
    renderPokemonDetails(i, arrPoke, arrPokeAbi, arrPokeSpec);
}


// fill
async function fill(i, arrPoke) {
    fillId(i);
    fillName(i);
    fillImg(i, arrPoke);
}


function fillName(i) {
    document.getElementById('pokeMiniName' + i).innerHTML = loadedPokeNames[i - 1];
    document.getElementById('pokedex-name' + i).innerHTML = loadedPokeNames[i - 1];
}


function fillId(i) {
    document.getElementById('pokeMiniId' + i).innerHTML = loadedPokeIds[i - 1];
    let formatId = format3LeftHandZeros(loadedPokeIds[i - 1]);
    document.getElementById('pokedex-id' + i).innerHTML = `#${formatId}`;
}


function fillImg(i, arrayPokemon) {
    let imgSrc = arrayPokemon['sprites']['other']['dream_world']['front_default'];
    document.getElementById('pokeMiniImg' + i).src = imgSrc;
    document.getElementById('pokedex-image' + i).src = imgSrc;
}


function fillSlot1(i, slot1) {
    document.getElementById('base-type1' + i).innerHTML = slot1;
}


function fillSlot2(i, slot2) {
    if (slot2 !== '') {
        document.getElementById('base-type2' + i).classList.remove('display-none');
    }
    document.getElementById('base-type2' + i).innerHTML = slot2;
}


async function renderPokemonDetails(i, arrPoke, arrPokeAbi, arrPokeSpec, arrPokeEvol) {
    renderPokemonDetailsAbout(i, arrPoke, arrPokeAbi, arrPokeSpec);
    renderPokemonDetailsBaseStats(i, arrPoke);
}


async function renderPokemonDetailsAbout(i, arrPoke, arrPokeAbi, arrPokeSpec) {
    document.getElementById('card1' + i).innerHTML = '';
    for (let j = 0; j < aboutRowIds.length; j++) {
        document.getElementById('card1' + i).innerHTML += await generateHTMLAbout(i, aboutRowIds[j], aboutNameIds[j], aboutValueIds[j], aboutTitles[j]);
    }
    await fillGenera(i, arrPokeSpec);
    await fillAbility(i, arrPokeAbi);
    await fillWeightAndHeight(i, arrPoke);
}


async function renderPokemonDetailsBaseStats(i, arrPoke) {
    document.getElementById('card2' + i).innerHTML = '';
    for (let j = 0; j < statIds.length; j++) {
        document.getElementById('card2' + i).innerHTML += await generateHTMLStats(i, statIds[j], `stat-name${j + 1}`, `stat-value${j + 1}`, `progress-about-bar-inner${j + 1}`, statNames[j]);
    }
    await fillBaseStats(i, arrPoke);
}


async function noticeData(i, arrayPoke, arrayPokeSpec, arrayPokeCol) {
    let pokeId = arrayPoke['id'];
    pokeId = pokeId.toString();
    loadedPokeIds.push(pokeId);
    let pokeName = getGermanData(arrayPokeSpec, 'names', 'name')
    loadedPokeNames.push(pokeName);
}


async function renderSlots(i, arr, arrType1st, arrType2nd) {
    if (arr['types'].length == 1) {
        getSlot1(i, arrType1st);
        emptySlot2(i, arr, arrType2nd);
    } else
        if (arr['types'].length == 2) {
            getSlot1(i, arrType1st);
            getSlot2(i, arr, arrType2nd);
        }
}


async function getSlot1(i, arrType1st) {
    let slot1 = getGermanData(arrType1st, 'names', 'name');
    fillSlot1(i, slot1);
    loadedPokeSlots1.push(slot1);
}


async function getSlot2(i, arrayPokemon, arrType2nd) {
    let slot2 = getGermanData(arrType2nd, 'names', 'name');
    fillSlot2(i, slot2);
    loadedPokeSlots2.push(slot2);
}


function emptySlot2(i) {
    let slot2 = '';
    fillSlot2(i, slot2);
    loadedPokeSlots2.push(slot2);
}


function showPokeCard(i) {
    switchContent(i);
    document.getElementById('pokedex' + i).classList.remove('display-none');
}


function hideAllPokeCards() {
    for (let i = 1; i <= loadedPokeIds.length; i++) {
        document.getElementById('pokedex' + i).classList.add('display-none');
    }
}


async function changeMiniToBlack(i, arrayPokemon) {
    let slot1 = arrayPokemon['types'][0]['type']['name'];
    if (slot1 == 'electric' || slot1 == 'ice') {
        document.getElementById('pokeMiniName' + i).classList.add(`color-black`);
        document.getElementById('pokeMiniId' + i).classList.add(`color-black`);

    }
}

async function changeCardToBlack(i, arrayPokemon) {
    let slot1 = arrayPokemon['types'][0]['type']['name'];
    if (slot1 == 'electric' || slot1 == 'ice') {
        for (let j = 0; j < colorBlackIds.length; j++) {
            document.getElementById(colorBlackIds[j] + i).classList.add(`color-black`);
        }
    }
}


// progressBar Homepage
function updateAmountPokesAndProgress(currentPokeNr) {
    renderAmountLoadedPokes(currentPokeNr);
    updateProgress(currentPokeNr);
}


function renderAmountLoadedPokes(currentPokeNr) {
    document.getElementById('amount-pokes-loaded').innerHTML = '';
    document.getElementById('amount-pokes-loaded').innerHTML = generateHTMLAmountLoadedPokes(currentPokeNr);
}


function generateHTMLAmountLoadedPokes(currentPokeNr) {
    return currentPokeNr + ' von 1010 geladen';
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
function switchContent(i) {
    let overlay = document.getElementById('overlay');
    let pokeCardContent = document.getElementById('pokeCardContent');
    if (overlay.classList.contains('display-none') == true) {
        displayOn(overlay);
        displayOn(pokeCardContent);
        topFunction();
    } else {
        displayOff(overlay);
        displayOff(pokeCardContent);
        hideAllPokeCards();
        topFunction();
    }
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


// searchBy(loadedPokeIds, 'searchId', 'pokeMiniButton');
function searchBy(array, searchIndex, pushIndex) {
    hidePokeMinis();
    for (let i = 0; i < array.length; i++) {
        let searchElement = document.getElementById(searchIndex).value;
        searchElement = handleSearchElementBy(searchIndex, searchElement);
        let compareElement = getCompareElementBy(i, searchIndex, array);
        let result = compareElement.startsWith(searchElement);
        if (result == true) {
            document.getElementById(pushIndex + loadedPokeIds[i]).classList.remove('display-none')
        }
    }
}


function handleSearchElementBy(searchIndex, searchElement) {
    if (searchIndex == 'searchName' || 'searchColor') {
        searchElement = searchElement.toLowerCase();
        return searchElement;
    }
    if (searchIndex == 'searchId') {
        let searchElement = searchElement.toString();
        return searchElement;
    }
}


function getCompareElementBy(i, searchIndex, array) {
    if (searchIndex == 'searchName' || 'searchName') {
        let compareElement = array[i].toLowerCase();
        return compareElement;
    }
    if (searchIndex == 'searchId') {
        let compareElement = array[i];
        return compareElement;
    }
}


// hide PokeMinis
function hidePokeMinis() {
    for (let i = 0; i < loadedPokeIds.length; i++) {
        document.getElementById('pokeMiniButton' + loadedPokeIds[i]).classList.add('display-none')
    }
}


// favorites
function setFavorite(i) {
    let hidden = document.getElementById(`fill0${i}`).classList.contains('display-none');
    if (hidden == true) {
        document.getElementById(`fill0${i}`).classList.remove('display-none');
        document.getElementById(`fill1${i}`).classList.add('display-none');
        removeFavorite(i);
        saveFavorites();

    } else {
        document.getElementById(`fill0${i}`).classList.add('display-none');
        document.getElementById(`fill1${i}`).classList.remove('display-none');
        addFavorite(i);
        saveFavorites();
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


// show Cards
function showCurrentCardById(cardId, i, slot1) {
    setAllCardsToDefault(i);
    setCurrentCardToActiv(cardId);
    setCurrentSlideOnActiv(cardId, i, slot1);
}


function setAllCardsToDefault(i) {
    for (let k = 1; k <= amountCards; k++) {
        let cardToHide = 'card' + k + i;
        document.getElementById(cardToHide).classList.add('display-none');
    }
}


function setCurrentCardToActiv(cardId) {
    document.getElementById(cardId).classList.remove('display-none');
}


function setCurrentSlideOnActiv(cardId, i, slot1) {
    setAllSliderToDefault(i, slot1);
    let bgnActiveType = 'bgn-slot-type-' + slot1;
    let bgnDefaultType = 'bgn-' + slot1;
    let currentSlide = 'btn-' + cardId;
    document.getElementById(currentSlide).classList.remove(`${bgnDefaultType}`);
    document.getElementById(currentSlide).classList.add(`${bgnActiveType}`);
}


function setAllSliderToDefault(i, slot1) {
    let bgnActiveType = 'bgn-slot-type-' + slot1;
    let bgnDefaultType = 'bgn-' + slot1;
    let bgnHoverType = 'bgn-hover-type-' + slot1;
    for (let j = 1; j <= amountCards; j++) {
        let sliderId = 'btn-card' + j + i;
        document.getElementById(sliderId).classList.remove(`${bgnActiveType}`);
        document.getElementById(sliderId).classList.remove(`${bgnHoverType}`);
        document.getElementById(sliderId).classList.add(`${bgnDefaultType}`);
    }
}


async function renderPokeTop(i, arrPoke) {
    let pokeSlot1 = arrPoke['types'][0]['type']['name'];
    let bgnSlotType = 'bgn-slot-type-' + pokeSlot1;
    let bgnType = 'bgn-type-' + pokeSlot1;
    if (arrPoke['types'].length == 2) {
        let pokeSlot2 = arrPoke['types'][1]['type']['name'];
        let bgnSlotType = 'bgn-slot-type-' + pokeSlot2;
        renderPokeSlot2(i, arrPoke, bgnSlotType);
    }
    renderPokeFavorite(i, bgnType);
    renderPokeToBlack(i);
    renderPokeSlot1(i, bgnSlotType);
}


function renderPokeFavorite(i, bgnType) {
    document.getElementById('btn-fill0' + i).classList.add(`${bgnType}`);
    document.getElementById('btn-fill1' + i).classList.add(`${bgnType}`);
};


function renderPokeToBlack(i, pokeSlot1) {
    if (pokeSlot1 == 'electric' || pokeSlot1 == 'ice') {
        changeToBlack(i, pokeSlot1);
    }
}


function renderPokeSlot1(i, bgnSlotType) {
    document.getElementById('base-type1' + i).classList.add(`${bgnSlotType}`);
};


function renderPokeSlot2(i, arrPoke, bgnSlotType) {
    if (arrPoke['types'].length == 2) {
        document.getElementById('base-type2' + i).classList.add(`${bgnSlotType}`);
    }
}


function changeToBlack(i, pokeSlot1) {
    let bgnSlotType = 'bgn-slot-type-' + pokeSlot1;
    document.getElementById('pokeImgFavFill0' + i).classList.add(`${bgnSlotType}`);
    document.getElementById('pokeImgFavFill1' + i).classList.add(`${bgnSlotType}`);
    document.getElementById('pokedex-name' + i).classList.add('color-black');
    document.getElementById('pokedex-id' + i).classList.add('color-black');
    document.getElementById('pokedex-slots' + i).classList.add('color-black');
    for (let cardNr = 1; cardNr <= 4; cardNr++) {
        document.getElementById('btn-card' + cardNr + i).classList.add('color-black');
    }
}


async function renderPokeNavigation(i, arrayPokemon) {
    let pokeSlot1 = arrayPokemon['types'][0]['type']['name'];
    let bgnSlotType = 'bgn-' + pokeSlot1;
    let bgnActiveType = 'bgn-slot-type-' + pokeSlot1;
    for (let cardNr = 1; cardNr <= 2; cardNr++) {
        document.getElementById('btn-card' + cardNr + i).classList.add(`${bgnSlotType}`);
    }
    document.getElementById('btn-card' + 1 + i).classList.remove(`${bgnSlotType}`);
    document.getElementById('btn-card' + 1 + i).classList.add(`${bgnActiveType}`);
}


// render About
async function fillGenera(i, arrPokeSpec) {
    let pokeGenera = getGermanData(arrPokeSpec, 'genera', 'genus');
    document.getElementById(aboutValueIds[0] + i).innerHTML = `${pokeGenera}`;
}


async function fillAbility(i, arrPokeAbi) {
    let pokeAbility = getGermanData(arrPokeAbi, 'names', 'name');
    document.getElementById(aboutValueIds[3] + i).innerHTML = `${pokeAbility}:`;
    let pokeAbiText = getGermanData(arrPokeAbi, 'flavor_text_entries', 'flavor_text');
    document.getElementById(aboutValueIds[4] + i).innerHTML = `<i>${pokeAbiText}</i>`;
}


async function fillWeightAndHeight(i, arrPoke) {
    let pokeWeight = arrPoke['weight'];
    document.getElementById(aboutValueIds[1] + i).innerHTML = `${pokeWeight} Poke-Einheiten`;
    let pokeHeight = arrPoke['height'];
    document.getElementById(aboutValueIds[2] + i).innerHTML = `${pokeHeight} Poke-Einheiten`;
};


// format Id
function format3LeftHandZeros(value) {
    value = value.toString();
    let formatValue = value.padStart(4, '0');
    return formatValue;
}


// Navigation PokeCard
function hoverNavigationOver(cardNr, i, slot1) {
    let bgnHoverType = 'bgn-hover-type-' + slot1;
    document.getElementById('btn-card' + cardNr + i).classList.add(`${bgnHoverType}`);
}


function hoverNavigationOut(cardNr, i, slot1) {
    let bgnHoverType = 'bgn-hover-type-' + slot1;
    document.getElementById('btn-card' + cardNr + i).classList.remove(`${bgnHoverType}`);
}


// fill BaseStats
async function fillBaseStats(i, arrayPokemon) {
    for (let j = 1; j <= arrayPokemon['stats'].length; j++) {
        let value = arrayPokemon['stats'][j - 1]['base_stat'];
        let valuePerCent = perCent(value);
        renderStatsAndProgressLine(i, value, valuePerCent, j);
    }
}


function perCent(value) {
    let valuePerCent = value / 255 * 100;
    return valuePerCent;
}


function renderStatsAndProgressLine(i, value, valuePerCent, j) {
    renderStatsLine(i, value, j);
    renderProgressLine(i, valuePerCent, j);
}


function renderStatsLine(i, value, j) {
    document.getElementById('stat-value' + j + i).innerHTML = `${value}`;
}


function renderProgressLine(i, valuePerCent, j) {
    document.getElementById('progress-about-bar-inner' + j + i).style = `width: ${valuePerCent}%`;
}


// formattedId
function getformattedId(url) {
    let stageId = url.split('https://pokeapi.co/api/v2/pokemon-species/');
    stageId = stageId[1].split('/');
    stageId = format3LeftHandZeros(stageId[0]);
    return stageId;
}


// clear search input
function clearSearchInput() {
    document.getElementById('searchName').value = '';
}


// generate HTML
function generateHTMLPokeMini(i) {
    return /*html*/`
      <button id="pokeMiniButton${i}" class="pokeMiniButton" onclick="showPokeCard(${i})">
          <div id="pokeMini${i}" class="pokeMini">
              <div id="pokeMini1stLine${i}" class="pokeMini1stLine">
                  <div id="pokeMiniId${i}" class="pokeMiniId">pokeId</div>
                  <div id="pokeMiniName${i}" class="pokeMiniName">pokeName</div>
                  </div>
                  <div id="pokeMiniImgDiv${i}" class="pokeMiniImgDiv">
                    <img id="pokeMiniImg${i}" class="pokeMiniImg" src="" onload="getDataProgress(${i})">
                  </div>
          </div>
      </button>
      `
}

function getDataProgress(i) {
    console.log('Bild ' + i + ' geladen.');
}


function generateHTMLPokeCard(i, slot1) {
    return /*html*/`
      <div id="pokedex${i}" class="pokedex display-none">
        <div id="pokedex-top${i}" class="pokedex-top">
        <div>
            <button onclick="switchContent(${i})" class="btn-back">
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
                    <div id="base-type1${i}" class="slot"></div>
                    <div id="base-type2${i}" class="slot display-none"></div>
                  </div>
                  <div class="favorite">
                      <div id="fill0${i}"><button id="btn-fill0${i}" class="btn-fav" onclick="setFavorite(${i})"><img id="pokeImgFavFill0${i}" src="./img/favorite_FILL0.png"></button></div>
                      <div id="fill1${i}" class="display-none"><button id="btn-fill1${i}"class="btn-fav" onclick="setFavorite(${i})"><img id="pokeImgFavFill1${i}" src="./img/favorite_FILL1.png"></button></div>
                  </div>
              </div>
              <div id="pokedex-image-place${i}" class="pokedex-image-place">
                  <div id="pokedex-image${i}" class="pokedex-image">
                  <img id="pokedex-img${i}" class="pokedex-img" src="">
                </div>
              </div>
          </div>
          <div id="pokedex-bottom${i}" class="pokedex-bottom">
          <div class="navigationPoke">
              <div onmouseover="hoverNavigationOver(1, ${i}, '${slot1}')" onmouseout="hoverNavigationOut(1, ${i}, '${slot1}')">
                  <button onclick="showCurrentCardById('card1${i}', ${i}, '${slot1}')" id="btn-card1${i}">Über</button>
              </div>
              <div onmouseover="hoverNavigationOver(2, ${i}, '${slot1}')" onmouseout="hoverNavigationOut(2, ${i}, '${slot1}')">
                  <button onclick="showCurrentCardById('card2${i}', ${i}, '${slot1}')" id="btn-card2${i}">Basis Werte</button>
              </div>
          </div>
          <div id="card1${i}" class="cards"></div>
          <div id="card2${i}" class="cards display-none"></div>
      </div> 
      `
}


async function generateHTMLAbout(i, aboutRowId, aboutNameId, aboutValueId, aboutTitle) {
    return /*html*/`
    <div id="${aboutRowId}${i}" class="aboutRow">
      <div id="${aboutNameId}${i}"class="aboutName">${aboutTitle}</div>
      <div id="${aboutValueId}${i}"class="aboutValue"></div>
    </div>
      `}


async function generateHTMLStats(i, id1st, id2nd, id3rd, id4th, title) {
    return /*html*/`
        <div id="${id1st}${i}" class="statRow">
          <div id="${id2nd}${i}" class="statName">${title}</div>
          <div class="statValueAndProgress">
            <div id="${id3rd}${i}" class="statValue"></div>
            <div class="progress-about-bar">
              <div id="${id4th}${i}" class="progress-about-bar-inner" style="width: 0%;"></div>
            </div>
          </div>
        </div>
    `}