let initEnd = 20;
let nextPokeNr = initEnd + 1;
let stepPokeNrs = 19;
let endPokeNr = nextPokeNr + stepPokeNrs;
let maxPokeNr = 1010;
let currentPokeNr = 0

let indexOfGermanData;
let functionRunning = false;
// for search - 1 = PokeNr 1
let loadedPokeNames = [0];
let loadedPokeIds = [0];

// dont't want that?:
let loadedPokeSlots1 = [0];
let loadedPokeSlots2 = [0];
let pokesFavorites = [0];
let pokesFlavorText = [0];

let baseStatNames = ['Kraftpunkte', 'Angriff', 'Verteidigung', 'Sezialangriff', 'Spezialverteidigung', 'Initiative'];
let baseStatId = ['pokeKpId', 'pokeAttackId', 'pokeDefenceId', 'pokeSpecAttackId', 'pokeSpecDefenceId', 'pokeSpeedId'];


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


async function getAbiltiesData(arrayPokemon) {
    let dynamikUrl = await takeDynamikUrl(arrayPokemon);
    let arrayPokemonAbilities = await fetchAbilitiesDataFromServer(dynamikUrl);
    return arrayPokemonAbilities;
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


// useArrays
async function fetchArrayPokemon(i, url1) {
    let arrayPokemon = await fetchDataFromServer(url1);
    await useArrayPokemonAndAbilities(i, arrayPokemon);
}


async function fetchArrayPokemonSpecies(i, url2) {
    let arrayPokemonSpecies = await fetchDataFromServer(url2);
    await useArrayPokemonSpecies(i, arrayPokemonSpecies);
}


async function useArrayPokemonAndAbilities(i, arrayPokemon) {
    console.log(i + ' pokemonData:', arrayPokemon);
    let arrayPokemonAbilities = await getAbiltiesData(arrayPokemon);
    await renderPokeMinisImgAndId(i, arrayPokemon);
    await stylePokeBgn(i, arrayPokemon, 'pokeMini');
    await changeMiniToBlack(i, arrayPokemon);
    await noticeDisplayedPokeId(arrayPokemon);
    await noticeDisplayedPokeSlots(arrayPokemon);
    await renderPokeCards1stLevel(i, arrayPokemon);
    await stylePokeBgn(i, arrayPokemon, 'pokedex');
    await renderPokeCardsTopAndNavigation(i, arrayPokemon);
    await useArrayPokemonAbilities(i, arrayPokemonAbilities);
    await renderPokeWeightAndHeight(i, arrayPokemon)
    await renderPokeCardBaseStats(i, arrayPokemon)
}


async function useArrayPokemonSpecies(i, arrayPokemonSpecies) {
    console.log(i + ' pokemon-speciesData:', arrayPokemonSpecies);
    let germanData = await getPokeGermanData(arrayPokemonSpecies, 'names', 'name');
    await fillPokeWithName(germanData, i)
    await noticeDisplayedPokeName(germanData);
    await renderPokeGenera(i, arrayPokemonSpecies);
    await renderPokeFlavor(i, arrayPokemonSpecies)
}


async function useArrayPokemonAbilities(i, arrayPokemonAbilities) {
    console.log(i + ' pokemon-abitiesData:', arrayPokemonAbilities);
    await renderPokeAbility(i, arrayPokemonAbilities);
}


// toDo
async function noticeDisplayedPokeId(arrayPokemon) {
    let pokeId = arrayPokemon['id'];
    pokeId = pokeId.toString();
    loadedPokeIds.push(pokeId);
}


async function noticeDisplayedPokeSlots(arrayPokemon) {
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


async function fillPokeWithName(currentGermanName, i) {
    document.getElementById('pokeMiniGermanName' + i).innerHTML = currentGermanName;
    document.getElementById('pokedex-name' + i).innerHTML = currentGermanName;
}


// render PokeMinis
async function renderPokeMinisImgAndId(i, arrayPokemon) {
    let imgSrc = arrayPokemon['sprites']['other']['official-artwork']['front_shiny'];
    let pokeId = arrayPokemon['id'];
    document.getElementById('myPlace').innerHTML += generateHTMLPokeMini1st(i, imgSrc, pokeId);
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


async function getPokeGermanData(array, index1st, index2nd) {
    searchIndexOfGermanData(array, index1st);
    let germanData = array[index1st][indexOfGermanData][index2nd];
    return germanData;
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
            j = arrayAsJSON[index].length;
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




// XXX
function showCurrentCardById(cardId, i) {
    setAllCardsToDefault(i);
    setCurrentCardToActiv(cardId);
    setCurrentSlideOnActiv(cardId, i);
}


function setAllCardsToDefault(i) {
    for (let k = 1; k <= 4; k++) {
        let cardToHide = 'card' + k + i;
        document.getElementById(cardToHide).classList.add('display-none');
    }
}


function setCurrentCardToActiv(cardId) {
    document.getElementById(cardId).classList.remove('display-none');
}


function setCurrentSlideOnActiv(cardId, i) {
    setAllSliderToDefault(i);
    let slot1 = document.getElementById('base-type1' + i).innerHTML;
    let bgnActiveType = 'bgn-slot-type-' + slot1;
    let bgnDefaultType = 'bgn-' + slot1;
    let currentSlide = 'btn-' + cardId;
    document.getElementById(currentSlide).classList.remove(`${bgnDefaultType}`);
    document.getElementById(currentSlide).classList.add(`${bgnActiveType}`);
}


function setAllSliderToDefault(i) {
    let slot1 = document.getElementById('base-type1' + i).innerHTML;
    let bgnActiveType = 'bgn-slot-type-' + slot1;
    let bgnDefaultType = 'bgn-' + slot1;
    let bgnHoverType = 'bgn-hover-type-' + slot1;
    for (let j = 1; j <= 4; j++) {
        let sliderId = 'btn-card' + j + i;
        document.getElementById(sliderId).classList.remove(`${bgnActiveType}`);
        document.getElementById(sliderId).classList.remove(`${bgnHoverType}`);
        document.getElementById(sliderId).classList.add(`${bgnDefaultType}`);
    }
}


// renderPokeCardsTopAndNavigation
async function renderPokeCardsTopAndNavigation(i, arrayPokemon) {
    await renderPokeTop(i, arrayPokemon);
    await renderPokeNavigation(i, arrayPokemon);
    // await renderPokeBottom(i);
    // await stylePokeBgnTop(i);
}

async function renderPokeTop(i, arrayPokemon) {
    let pokeSlot1 = arrayPokemon['types'][0]['type']['name'];
    let bgnSlotType = 'bgn-slot-type-' + pokeSlot1;
    let bgnType = 'bgn-type-' + pokeSlot1;
    let pokeImg = arrayPokemon['sprites']['other']['official-artwork']['front_shiny'];
    renderPokeId(i, arrayPokemon);
    renderPokeSlot1(i, bgnSlotType, pokeSlot1);
    renderPokeSlot2(i);
    renderPokeFavorite(i, bgnType);
    renderPokeImage(i, pokeImg);
    renderPokeToBlack(i, pokeSlot1);
}


function renderPokeToBlack(i, pokeSlot1) {
    if (pokeSlot1 == 'electric' || pokeSlot1 == 'ice') {
        changeToBlack(i, pokeSlot1);
    }
}


function renderPokeSlot2(i) {
    if (loadedPokeSlots2[i] == '') {
        return;
    } else {
        let pokeSlot2 = loadedPokeSlots2[i];
        let bgnSlotType = 'bgn-slot-type-' + pokeSlot2;
        document.getElementById('pokedex-slots' + i).innerHTML += `<div id="base-type2${i}" class="slot ${bgnSlotType}">${pokeSlot2}</div>`;
    }
}


function renderPokeImage(i, pokeImg) {
    document.getElementById('pokedex-image' + i).innerHTML += `<img src="${pokeImg}">`;
}


function renderPokeSlot1(i, bgnSlotType, pokeSlot1) {
    document.getElementById('pokedex-slots' + i).innerHTML += `<div id="base-type1${i}" class="slot ${bgnSlotType}">${pokeSlot1}</div>`;
};


function renderPokeFavorite(i, bgnType) {
    document.getElementById('btn-fill0' + i).classList.add(`${bgnType}`);
    document.getElementById('btn-fill1' + i).classList.add(`${bgnType}`);
};


function renderPokeId(i, arrayPokemon) {
    let pokeId = arrayPokemon['id'];
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
    for (let cardNr = 1; cardNr <= 4; cardNr++) {
        document.getElementById('btn-card' + cardNr + i).classList.add('color-black');
    }
}


async function renderPokeNavigation(i, arrayPokemon) {
    let pokeSlot1 = arrayPokemon['types'][0]['type']['name'];
    let bgnSlotType = 'bgn-' + pokeSlot1;
    let bgnActiveType = 'bgn-slot-type-' + pokeSlot1;
    for (let cardNr = 1; cardNr <= 4; cardNr++) {
        document.getElementById('btn-card' + cardNr + i).classList.add(`${bgnSlotType}`);
    }
    document.getElementById('btn-card' + 1 + i).classList.remove(`${bgnSlotType}`);
    document.getElementById('btn-card' + 1 + i).classList.add(`${bgnActiveType}`);
}


// render About
async function renderPokeGenera(i, arrayPokemonSpecies) {
    let pokeGenera = arrayPokemonSpecies['genera'][4]['genus'];
    document.getElementById('card1' + i).innerHTML += `<div><b>Kategorie: </b>${pokeGenera}</div>`;
}


async function renderPokeAbility(i, arrayPokemonAbilities) {
    let germanData1st = await getPokeGermanData(arrayPokemonAbilities, 'names', 'name');
    document.getElementById('card1' + i).innerHTML += `<div><b>Fähigkeit: </b>${germanData1st}:</div>`;

    let germanData2nd = await getPokeGermanData(arrayPokemonAbilities, 'flavor_text_entries', 'flavor_text');
    document.getElementById('card1' + i).innerHTML += `<div>${germanData2nd}</div>`;
}


async function renderPokeWeightAndHeight(i, arrayPokemon) {
    let pokeWeight = arrayPokemon['weight'];
    document.getElementById('card1' + i).innerHTML += `<div><b>Gewicht: </b>${pokeWeight} Poke-Einheiten</div>`;
    let pokeHeight = arrayPokemon['height'];
    document.getElementById('card1' + i).innerHTML += `<div><b>Höhe: </b>${pokeHeight} Poke-Einheiten</div>`;
};


async function renderPokeFlavor(i, arrayPokemonSpecies) {
    let germanText = await getPokeGermanData(arrayPokemonSpecies, 'flavor_text_entries', 'flavor_text')
    document.getElementById('card1' + i).innerHTML += `<div>${germanText}</div>`;
};


// format Id
function format3LeftHandZeros(value) {
    value = value.toString();
    let formatValue = value.padStart(4, '0');
    return formatValue;
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


// render BaseStats
async function renderPokeCardBaseStats(i, arrayPokemon) {
    for (let j = 0; j < arrayPokemon['stats'].length; j++) {
        let value = arrayPokemon['stats'][j]['base_stat'];
        let valuePerCent = perCent(value);
        let id = baseStatId[j] + i;
        renderStatsAndProgressLine(i, baseStatNames[j], value, valuePerCent, id);
    }
}


function perCent(value) {
    let valuePerCent = value / 255 * 100;
    return valuePerCent;
}


function renderStatsAndProgressLine(i, name, value, valuePerCent, id) {
    renderStatsLine(i, name, value, id);
    renderProgressLine(valuePerCent, id);
}


function renderStatsLine(i, name, absoluteValue, id) {
    document.getElementById('card2' + i).innerHTML += `<div class="stats-line"><div class="stat"><div>${name}: </div><div><b>${absoluteValue}</b></div></div><div class="progess-stats-line" id="${id}"></div></div>`;
}


function renderProgressLine(value, id) {
    document.getElementById(id).innerHTML += `<div class="progress-stats" style="width: ${value}%"></div>`;
}