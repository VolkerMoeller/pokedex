let initEnd = 5;
let nextPokeNr = initEnd + 1;
let stepPokeNrs = 50;
let endPokeNr = nextPokeNr + stepPokeNrs;
let maxPokeNr = 1010;
let currentPokeNr = 0

let indexOfGermanData;
let functionRunning = false;

let loadedPokeIds = [];
let loadedPokeNames = [];
let loadedPokeColors = [];
let loadedPokeSlots1 = [];
let loadedPokeSlots2 = [];
let pokesFavorites = [];

let lastCard = 0;

let statNames = ['Kraftpunkte:', 'Angriff:', 'Verteidigung:', 'Spezialangriff:', 'Spezialverteid.:', 'Initiative'];
let statIds = ['hp', 'attack', 'defence', 'special-attack', 'special-defence', 'speed'];

let colorBlackIds = ['pokedex-name', 'pokedex-id', 'base-type1', 'base-type2', 'btn-card1', 'btn-card2', 'btn-card3', 'btn-card4'];

let moveRowIds = ['moveRowId1', 'moveRowId2', 'moveRowId3', 'moveRowId4', 'moveRowId5'];
let moveValueIds = ['moveValueId1', 'moveValueId2', 'moveValueId3', 'moveValueId4', 'moveValueId5'];
let moveNameIds = ['moveNameId1', 'moveNameId2', 'moveNameId3', 'moveNameId4', 'moveNameId5'];
let moveTextIds = ['moveTextId1', 'moveTextId2', 'moveTextId3', 'moveTextId4', 'moveTextId5'];

let aboutRowIds = ['genera', 'weight', 'height', 'ability', 'text'];
let aboutNameIds = ['generaName', 'weightName', 'heightName', 'abilityName', 'textName'];
let aboutValueIds = ['generaValue', 'weightValue', 'heightValue', 'abilityValue', 'textValue'];
let aboutTitles = ['Klasse:', 'Gewicht:', 'Höhe:', 'Fähigkeit:', ''];


async function init() {
    loadedPokeNames = [];
    loadedPokeIds = [];
    document.getElementById('myPlace').innerHTML = '';
    await getData(1, initEnd);
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


// render
async function render(i, arrPoke, arrPokeAbi, arrPokeSpec, arrPokeCol, arrPokeEvol) {
    renderPokeMini(i, arrPoke);
    renderPokeCard(i, arrPoke, arrPokeAbi, arrPokeSpec, arrPokeEvol);
}


async function renderPokeMini(i, arrPoke) {
    document.getElementById('myPlace').innerHTML += generateHTMLPokeMini(i);
    stylePokeBgn(i, arrPoke, 'pokeMini');
    changeMiniToBlack(i, arrPoke);
}


function renderPokeCard(i, arrPoke, arrPokeAbi, arrPokeSpec, arrPokeEvol) {
    let slot = arrPoke['types'][0]['type']['name'];
    document.getElementById('pokeCardPlace').innerHTML += generateHTMLPokeCard(i, slot);
    stylePokeBgn(i, arrPoke, 'pokedex');
    changeCardToBlack(i, arrPoke);
    renderPokeTop(i, arrPoke);
    renderSlots(i, arrPoke);
    renderPokeNavigation(i, arrPoke);
    renderPokemonDetails(i, arrPoke, arrPokeAbi, arrPokeSpec, arrPokeEvol);
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
    document.getElementById('pokeMiniImgDiv' + i).innerHTML = `<img src=${imgSrc}>`;
    document.getElementById('pokedex-image' + i).innerHTML = `<img src=${imgSrc}>`;
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
    checkTwoWaysToHandleEvol(i, arrPokeEvol);
    renderPokemonDetailsMoves(i, arrPoke);
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


async function useArrayPokemonSpecies(i, arrayPokemonSpecies) {
    console.log(i + ' pokemon-speciesData:', arrayPokemonSpecies);
    await useArrayPokemonSpeciesForMinis(i, arrayPokemonSpecies);
    await useArrayPokemonSpeciesForCard(i, arrayPokemonSpecies);
}


async function useArrayPokemonSpeciesForMinis(i, arrayPokemonSpecies) {
    await renderGermanNameMini(i, arrayPokemonSpecies);
}


async function renderGermanNameMini(i, arrayPokemonSpecies) {
    let germanData = await getPokeGermanData(arrayPokemonSpecies, 'names', 'name');
    await fillPokeWithName('pokeMiniGermanName', i, germanData)
}


async function useArrayPokemonSpeciesForCard(i, arrayPokemonSpecies) {
    let germanData = await getPokeGermanData(arrayPokemonSpecies, 'names', 'name');
    await fillPokeWithName('pokedex-name', i, germanData)
    await noticeDisplayedPokeName(germanData);
}


async function noticeData(i, arrayPoke, arrayPokeSpec, arrayPokeCol) {
    let pokeId = arrayPoke['id'];
    pokeId = pokeId.toString();
    loadedPokeIds.push(pokeId);
    let pokeName = getGermanData(arrayPokeSpec, 'names', 'name')
    loadedPokeNames.push(pokeName);
    let pokeColor = getGermanData(arrayPokeCol, 'names', 'name')
    loadedPokeColors.push(pokeColor);
}


async function renderSlots(i, arrayPokemon) {
    if (arrayPokemon['types'].length == 1) {
        getSlot1(i, arrayPokemon);
        emptySlot2(i, arrayPokemon);
    } else
        if (arrayPokemon['types'].length == 2) {
            getSlot1(i, arrayPokemon);
            getSlot2(i, arrayPokemon);
        }
}


async function getSlot1(i, arrayPokemon) {
    let data = await fetchDataByDynamikUrl(arrayPokemon, 'types', 0, 'type');
    let slot1 = getGermanData(data, 'names', 'name');
    fillSlot1(i, slot1);
    loadedPokeSlots1.push(slot1);
}


async function getSlot2(i, arrayPokemon) {
    let data2 = await fetchDataByDynamikUrl(arrayPokemon, 'types', 1, 'type');
    let slot2 = getGermanData(data2, 'names', 'name');
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
    for (let i = 1; i < loadedPokeIds.length; i++) {
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
function switchContent(i) {
    lastCard = i;
    let overlay = document.getElementById('overlay');
    let pokeCardContent = document.getElementById('pokeCardContent');
    if (overlay.classList.contains('display-none') == true) {
        displayOn(overlay);
        displayOn(pokeCardContent);
        topFunction();
        return lastCard;
    } else {
        displayOff(overlay);
        displayOff(pokeCardContent);
        hideAllPokeCards();
        topFunction();
        return lastCard;
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


// searchBy
function searchByName() {
    hidePokeMinis();
    for (let i = 0; i < loadedPokeNames.length; i++) {
        let searchName = document.getElementById('searchName').value;
        searchName = searchName.toLowerCase();
        let loadedPokeName = loadedPokeNames[i].toLowerCase();
        let result = loadedPokeName.startsWith(searchName);
        if (result == true) {
            document.getElementById('pokeMiniButton' + loadedPokeIds[i]).classList.remove('display-none')
        }
    }
}


// XXXX
function searchBy() {
    hidePokeMinis();
    for (let i = 0; i < loadedPokeNames.length; i++) {
        let searchName = document.getElementById('searchName').value;
        searchName = searchName.toLowerCase();
        let loadedPokeName = loadedPokeNames[i].toLowerCase();
        let result = loadedPokeName.startsWith(searchName);
        if (result == true) {
            document.getElementById('pokeMiniButton' + loadedPokeIds[i]).classList.remove('display-none')
        }
    }
}

function searchByColor() {
    hidePokeMinis();
    for (let i = 0; i < loadedPokeColors.length; i++) {
        let searchColor = document.getElementById('searchColor').value;
        searchColor = searchColor.toLowerCase();
        let loadedPokeColor = loadedPokeColors[i].toLowerCase();
        let result = loadedPokeColor.startsWith(searchColor);
        if (result == true) {
            document.getElementById('pokeMiniButton' + loadedPokeIds[i]).classList.remove('display-none')
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
            document.getElementById('pokeMiniButton' + loadedPokeIds[i]).classList.remove('display-none')
        }
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


// show Cards
function showCurrentCardById(cardId, i, slot1) {
    setAllCardsToDefault(i);
    setCurrentCardToActiv(cardId);
    setCurrentSlideOnActiv(cardId, i, slot1);
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
    for (let j = 1; j <= 4; j++) {
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
    for (let cardNr = 1; cardNr <= 4; cardNr++) {
        document.getElementById('btn-card' + cardNr + i).classList.add(`${bgnSlotType}`);
    }
    document.getElementById('btn-card' + 1 + i).classList.remove(`${bgnSlotType}`);
    document.getElementById('btn-card' + 1 + i).classList.add(`${bgnActiveType}`);
}


// render About - card 1
async function fillGenera(i, arrPokeSpec) {
    let pokeGenera = getGermanData(arrPokeSpec, 'genera', 'genus');
    document.getElementById(aboutValueIds[0] + i).innerHTML = `${pokeGenera}`;
}


async function fillAbility(i, arrPokeAbi) {
    let pokeAbility = getGermanData(arrPokeAbi, 'names', 'name');
    document.getElementById(aboutValueIds[3] + i).innerHTML = `<i>${pokeAbility}:</i>`;
    let pokeAbiText = getGermanData(arrPokeAbi, 'flavor_text_entries', 'flavor_text');
    document.getElementById(aboutValueIds[4] + i).innerHTML = `${pokeAbiText}`;
}


async function fillWeightAndHeight(i, arrPoke) {
    let pokeWeight = arrPoke['weight'];
    document.getElementById(aboutValueIds[1] + i).innerHTML = `${pokeWeight} Poke-Einheiten`;
    let pokeHeight = arrPoke['height'];
    document.getElementById(aboutValueIds[2] + i).innerHTML = `${pokeHeight} Poke-Einheiten`;
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


// render Evolution
function checkTwoWaysToHandleEvol(i, arrPokeEvol) {
    let decider = arrPokeEvol['chain']['evolves_to'].length;
    if (decider == 1) {
        renderPokemonDetailsEvolution(i, arrPokeEvol);
    } else {
        renderPokemonDetailsEvolution2nd(i, arrPokeEvol);
    }
}


function renderPokemonDetailsEvolution(i, arrPokeEvol) {
    document.getElementById('card3' + i).innerHTML = generateHTMLEvol(i);
    fillEvolFirst(i, arrPokeEvol);
    if (arrPokeEvol['chain']['evolves_to'].length > 0) {
        fillEvolSecond(i, arrPokeEvol);
        if (arrPokeEvol['chain']['evolves_to'][0]['evolves_to'].length > 0) {
            fillEvolThird(i, arrPokeEvol);
        } else {
            document.getElementById('thirdStage-value' + i).innerHTML = `Keine Weiterentwicklung`;
            return;
        }
    } else {
        document.getElementById('secondStage-value' + i).innerHTML = `Keine Weiterentwicklung`;
        return;
    }
}


async function fillEvolFirst(i, arrPokeEvol) {
    let stage1stUrl = arrPokeEvol['chain']['species']['url'];
    let stage1stId = getformattedId(stage1stUrl);
    let value = await getValue(stage1stUrl);
    fillValue(i, 'firstStage-value', stage1stId, value);
}


async function fillEvolSecond(i, arrPokeEvol) {
    let stage2ndUrl = arrPokeEvol['chain']['evolves_to'][0]['species']['url'];
    let stage2ndId = getformattedId(stage2ndUrl);
    let value = await getValue(stage2ndUrl);
    fillValue(i, 'secondStage-value', stage2ndId, value);
}


async function fillEvolThird(i, arrPokeEvol) {
    let stage3rdUrl = arrPokeEvol['chain']['evolves_to'][0]['evolves_to'][0]['species']['url'];
    let stage3rdId = getformattedId(stage3rdUrl);
    let value = await getValue(stage3rdUrl);
    fillValue(i, 'thirdStage-value', stage3rdId, value);
}


async function getValue(url) {
    let arr = await fetchDataFromServer(url);
    // arr.then(result => {
    // let name = getGermanData(result, 'names', 'name');
    let name = getGermanData(arr, 'names', 'name');
    return name;
    // });
}


function fillValue(i, index, id, name) {
    document.getElementById(index + i).innerHTML = name;
    document.getElementById(index + i).innerHTML += ` #${id}`;
}


function renderPokemonDetailsEvolution2nd(i, arrPokeEvol) {
    document.getElementById('card3' + i).innerHTML = generateHTMLEvol2nd(i);
    fillEvol(i, arrPokeEvol);
}


async function fillEvol(i, arrPokeEvol) {
    let url1st = arrPokeEvol['chain']['species']['url'];
    let id1st = getformattedId(url1st);
    let value1st = await getValue(url1st);
    fillValue2nd(i, -1, value1st, id1st);

    if (arrPokeEvol['chain']['evolves_to'].length == 0) {
        document.getElementById('stages' + i).innerHTML += `<tr><td>Keine Weiterentwicklung</td</tr>`;

    }

    for (let j = 0; j < arrPokeEvol['chain']['evolves_to'].length; j++) {
        let url = arrPokeEvol['chain']['evolves_to'][j]['species']['url'];
        let id = getformattedId(url);
        let value = await getValue(url);
        fillValue2nd(i, j, value, id);
    }
}


function fillValue2nd(i, j, value, id) {
    document.getElementById('stages' + i).innerHTML += `<tr><td>${j + 2}</td><td>${value}</td><td>#${id}</td></tr>`;
}


function getformattedId(url) {
    let stageId = url.split('https://pokeapi.co/api/v2/pokemon-species/');
    stageId = stageId[1].split('/');
    stageId = format3LeftHandZeros(stageId[0]);
    return stageId;
}


// render Moves
async function renderPokemonDetailsMoves(i, arrPoke) {
    document.getElementById('card4' + i).innerHTML = '';
    if (arrPoke['moves'].length > 5) {
        let end = 5;
        getMove(end, arrPoke, i);
    } else {
        let end = arrPoke['moves'].length
        getMove(end, arrPoke, i);
    }
}


async function getMove(end, arrPoke, i) {
    for (let j = 0; j < end; j++) {
        let arrMove = await fetchDataByDynamikUrl(arrPoke, 'moves', j, 'move');
        let move = getGermanData(arrMove, 'names', 'name');
        let moveText = getGermanData(arrMove, 'flavor_text_entries', 'flavor_text');
        document.getElementById('card4' + i).innerHTML += await generateHTMLMoves(i, moveRowIds[j], moveNameIds[j], moveValueIds[j], moveTextIds[j]);
        fillMove(i, j, move, moveText);
    }
}


function fillMove(i, j, move, moveText) {
    document.getElementById(moveValueIds[j] + i).innerHTML = `${j + 1}. ${move}:`;
    document.getElementById(moveTextIds[j] + i).innerHTML += moveText;
}