let initEnd = 30;
let nextPokeNr = initEnd + 1;
let stepPokeNrs = 19;
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
async function render(i, arrPoke, arrPokeAbi, arrPokeSpec, arrPokeCol) {
    renderPokeMini(i, arrPoke);
    renderPokeCard(i, arrPoke, arrPokeAbi, arrPokeSpec);
}


async function renderPokeMini(i, arrPoke) {
    document.getElementById('myPlace').innerHTML += generateHTMLPokeMini(i);
    stylePokeBgn(i, arrPoke, 'pokeMini');
    changeMiniToBlack(i, arrPoke);
}


function renderPokeCard(i, arrPoke, arrPokeAbi, arrPokeSpec) {
    let slot = arrPoke['types'][0]['type']['name'];
    document.getElementById('pokeCardPlace').innerHTML += generateHTMLPokeCard(i, slot);
    stylePokeBgn(i, arrPoke, 'pokedex');
    changeCardToBlack(i, arrPoke);
    renderPokeTop(i, arrPoke);
    renderSlots(i, arrPoke);
    renderPokeNavigation(i, arrPoke);
    renderPokemonDetails(i, arrPoke, arrPokeAbi, arrPokeSpec);
}


// fill
async function fill(i, arrPoke, arrPokeAbi, arrPokeSpec, arrPokeCol) {
    fillPoke(i, arrPoke);
    // fillPokeCard(i);
}


function fillPoke(i, arrayPokemon) {
    fillId(i);
    fillName(i);
    fillImg(i, arrayPokemon);
}


function fillName(i, arrayPokemon) {
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
    document.getElementById('base-type2' + i).innerHTML = slot2;
}


async function renderPokemonDetails(i, arrPoke, arrPokeAbi, arrPokeSpec) {
    renderPokemonDetailsAbout(i, arrPoke, arrPokeAbi, arrPokeSpec);
    renderPokemonDetailsBaseStats(i, arrPoke);
    renderPokemonDetailsEvolution(i, arrPokeSpec);
    // await renderPokemonDetailsMoves(i, arrayPokemon);
}


async function renderPokemonDetailsAbout(i, arrPoke, arrPokeAbi, arrPokeSpec) {
    document.getElementById('card1' + i).innerHTML = generateHTMLAbout(i);
    await fillGenera(i, arrPokeSpec);
    await fillAbility(i, arrPokeAbi);
    await fillWeightAndHeight(i, arrPoke);
}


async function renderPokemonDetailsBaseStats(i, arrPoke) {
    document.getElementById('card2' + i).innerHTML = generateHTMLStats(i);
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
    // for search:
    await noticeDisplayedPokeName(germanData);
    // await renderPokeAbout(i, arrayPokem  onSpecies);
}


async function useArrayPokemonAbilities(i, arrayPokemonAbilities) {
    console.log(i + ' pokemon-abitiesData:', arrayPokemonAbilities);
    // await useArrayPokemonAbilitiesForMinis(i, arrayPokemonAblities);
    await useArrayPokemonAbilitiesForCard(i, arrayPokemonAbilities);
}

async function useArrayPokemonAbilitiesForCard(i, arrayPokemonAbilities) {

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
        let data = fetchDataByDynamikUrl(arrayPokemon, 'types', 0, 'type');
        data.then(
            function (result) {
                let slot1 = getGermanData(result, 'names', 'name');
                fillSlot1(i, slot1);
                loadedPokeSlots1.push(slot1);
            }
        )
        let slot2 = '';
        fillSlot2(i, slot2);
        loadedPokeSlots2.push(slot2);
    } else
        if (arrayPokemon['types'].length == 2) {
            let data1 = fetchDataByDynamikUrl(arrayPokemon, 'types', 0, 'type');
            data1.then(
                function (result) {
                    let slot1 = getGermanData(result, 'names', 'name');
                    fillSlot1(i, slot1);
                    loadedPokeSlots1.push(slot1);
                }
            )
            let data2 = fetchDataByDynamikUrl(arrayPokemon, 'types', 1, 'type');
            data2.then(
                function (result) {
                    let slot2 = getGermanData(result, 'names', 'name');
                    fillSlot2(i, slot2);
                    loadedPokeSlots2.push(slot2);
                }
            )
        }
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
        document.getElementById('pokedex-name' + i).classList.add(`color-black`);
        document.getElementById('pokedex-id' + i).classList.add(`color-black`);
        document.getElementById('base-type1' + i).classList.add(`color-black`);
        document.getElementById('base-type2' + i).classList.add(`color-black`);
        document.getElementById('btn-card1' + i).classList.add(`color-black`);
        document.getElementById('btn-card2' + i).classList.add(`color-black`);
        document.getElementById('btn-card3' + i).classList.add(`color-black`);
        document.getElementById('btn-card4' + i).classList.add(`color-black`);
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
    } else {
        return;
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
    document.getElementById('genera-value' + i).innerHTML = `${pokeGenera}`;
}


async function fillAbility(i, arrPokeAbi) {
    let pokeAbility = getGermanData(arrPokeAbi, 'names', 'name');
    document.getElementById('ability-value' + i).innerHTML = `<i>${pokeAbility}:</i>`;
    let pokeAbiText = getGermanData(arrPokeAbi, 'flavor_text_entries', 'flavor_text');
    document.getElementById('ability-text' + i).innerHTML = `${pokeAbiText}`;
}


async function fillWeightAndHeight(i, arrPoke) {
    let pokeWeight = arrPoke['weight'];
    document.getElementById('weight-value' + i).innerHTML = `${pokeWeight} Poke-Einheiten`;
    let pokeHeight = arrPoke['height'];
    document.getElementById('height-value' + i).innerHTML = `${pokeHeight} Poke-Einheiten`;
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

function renderPokemonDetailsEvolution(i, arrPokeSpec) {
    let evolData = fetchDataByDynamikUrl(arrPokeSpec, 'evolution_chain', '', '');
    evolData.then(
        function (result) {
            let startPokeNameURL = result['chain']['species']['url'];
            let startPokeNameArray = fetchDataFromServer(startPokeNameURL);
            console.log(startPokeNameArray);
        }
        // console.log(startPokeName);
        // let startPokeName = fetchDataByDynamikUrl(result, 'evolution_chain', '', '');
        // let startName = getGermanData(result, 'names', 'name');

    )

}

// async function getNamePokeStart(resp6EvolutionInfoAsJSON, i) {
//     let startPokeNameURL = resp6EvolutionInfoAsJSON['chain']['species']['url'];
//     await loadGermanStartPokeName(startPokeNameURL);
//     let startPokeId = currentGermanStartPokeName['id'];
//     let startPokeNames = currentGermanStartPokeName['names'];
//     await searchGermanStartPokeName(startPokeNames, i, startPokeId);
//     await getNamePokeEvolut1st(resp6EvolutionInfoAsJSON, i);
// }