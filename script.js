let arrs = [];
let allPokes = [];
let loadedPokeNames = [];
let initEnd = 10;
let nextPokeNr = initEnd + 1;
let stepPokeNrs = 9;
let endPokeNr = nextPokeNr + stepPokeNrs;
let maxPokeNr = 1010;
let currentPokeNr = 0
let scrollCounter = 0;
let amountSlides = 2
let pokesLoaded = false;
let functionRunning = false;
let colorBlackIds = ['pokeMiniName', 'pokeMiniId', 'pokeMiniType1', 'pokedex-name', 'pokedex-id', 'base-type1', 'base-type2', 'btn-card1', 'btn-card2'];
let pokesFavorites = [];

async function init() {
    allPokes = [];
    loadedPokeNames = [];
    loadFavorites();
    document.getElementById('myPlace').innerHTML = '';
    await getData(1, initEnd);
}


async function getData(begin, end) {
    if (!functionRunning) {
        statusLoadingPokes(false, true);
        functionRunning = true;
        for (let i = begin; i <= end; i++) {
            await performServerRequests(i);
            updateAmountPokesAndProgress(i);
        }
        pushData();
        generateHTML(begin - 1, end);
        stylePokes(begin - 1, end);
        updateCountNrs(end);
        setFavMini();
        statusLoadingPokes(true, false);
        functionRunning = false;
    }
}


function statusLoadingPokes(status1st, status2nd) {
    pokesLoaded = status1st;
    document.getElementById('loadBtnStart').disabled = status2nd;
    document.getElementById('searchName').disabled = status2nd;
    document.getElementById('loadBtnStart').classList.toggle('disabled');
    document.getElementById('searchName').classList.toggle('disabled');
    document.getElementById('infoLoad').classList.toggle('display-none');
    if (status1st == false) {
        document.getElementById('overlayLoad').classList.remove('display-none');
    } else {
        document.getElementById('overlayLoad').classList.add('display-none');
    }
}


function pushData() {
    for (let j = 0; j < allPokes.length; j++) {
        allPokes[j] = (
            {
                "pokeId": arrs[j]['arrPoke']['id'],
                "pokeName": getGermanData(arrs[j]['arrSpec'], 'names', 'name'),
                "pokeImg": arrs[j]['arrPoke']['sprites']['other']['dream_world']['front_default'],
                "pokeTypes": [getGermanData(arrs[j]['arrType1'], 'names', 'name'), checkIfSlot2(j, 'de')],
                "pokeTypesEn": [arrs[j]['arrType1']['name'], checkIfSlot2(j, 'en')],
                "pokeStatNames": [getGermanData(arrs[j]['arrStat1'], 'names', 'name'), getGermanData(arrs[j]['arrStat2'], 'names', 'name'), getGermanData(arrs[j]['arrStat3'], 'names', 'name'), getGermanData(arrs[j]['arrStat4'], 'names', 'name'), getGermanData(arrs[j]['arrStat5'], 'names', 'name')],
                "pokeStatValues": [arrs[j]['arrPoke']['stats'][0]['base_stat'], arrs[j]['arrPoke']['stats'][1]['base_stat'], arrs[j]['arrPoke']['stats'][2]['base_stat'], arrs[j]['arrPoke']['stats'][3]['base_stat'], arrs[j]['arrPoke']['stats'][4]['base_stat']],
                "pokeAboutNames": ['Klasse', 'Gewicht', 'Höhe', 'Fähigkeit', ''],
                "pokeAboutValues": [getGermanData(arrs[j]['arrSpec'], 'genera', 'genus'), arrs[j]['arrPoke']['weight'], arrs[j]['arrPoke']['height'], getGermanData(arrs[j]['arrAbi'], 'names', 'name'), getGermanData(arrs[j]['arrAbi'], 'flavor_text_entries', 'flavor_text')],
            }
        )
    }
}


function generateHTML(begin, end) {
    for (let i = begin; i < end; i++) {
        document.getElementById('myPlace').innerHTML += generateHTMLPokeMini(i, format3LeftHandZeros(allPokes[i]['pokeId']), allPokes[i]['pokeName'], allPokes[i]['pokeTypes'][0], allPokes[i]['pokeImg'],);
        document.getElementById('pokeCardPlace').innerHTML += generateHTMLPokeMax(i, allPokes[i]['pokeName'], format3LeftHandZeros(allPokes[i]['pokeId']), allPokes[i]['pokeTypes'][0], allPokes[i]['pokeTypes'][1], allPokes[i]['pokeImg'], allPokes[i]['pokeTypesEn'][0],);
        for (let j = 0; j < allPokes[i].pokeAboutValues.length; j++) {
            document.getElementById('card1' + i).innerHTML += generateHTMLAbout(allPokes[i].pokeAboutNames[j], allPokes[i].pokeAboutValues[j]);
        }
        for (let j = 0; j < allPokes[i].pokeStatValues.length; j++) {
            document.getElementById('card2' + i).innerHTML += generateHTMLStats(i, j, allPokes[i].pokeStatNames[j], allPokes[i].pokeStatValues[j], perCent(allPokes[i].pokeStatValues[j]));
        }
    }
}


function stylePokes(begin, end) {
    for (let i = begin; i < end; i++) {
        stylePokeBgn(i, 'pokeMini');
        stylePokeBgn(i, 'pokedex');
        showSlot2(i);
        stylePokeTop(i);
        stylePokeNavigation(i);
        changePokesToBlack(i);
    }
}


async function initNext() {
    clearSearchInput();
    getData(nextPokeNr, endPokeNr);
}


function updateCountNrs(end) {
    nextPokeNr = end + 1;
    endPokeNr = nextPokeNr + stepPokeNrs;
}


async function performServerRequests(i) {
    let url1 = `https://pokeapi.co/api/v2/pokemon/${i}/`;
    let url2 = `https://pokeapi.co/api/v2/pokemon-species/${i}/`;
    arrs.push({
        "arrPoke": await fetchDataFromServer(url1),
        "arrSpec": await fetchDataFromServer(url2),
        "arrAbi": '', 'arrType1': '', 'arrType2': '', 'arrStat1': '', 'arrStat2': '', 'arrStat3': '', 'arrStat4': '', 'arrStat5': '', 'arrStat6': '',
    });
    await getDataByDynamikUrl(i);
}


async function getDataByDynamikUrl(i) {
    let j = i - 1;
    arrs[j]['arrAbi'] = await fetchDataByDynamikUrl(arrs[j]['arrPoke'], 'abilities', '', 'ability');
    arrs[j]['arrType1'] = await fetchDataByDynamikUrl(arrs[j]['arrPoke'], 'types', 0, 'type');
    if (arrs[j]['arrPoke']['types'].length == 2) {
        arrs[j]['arrType2'] = await fetchDataByDynamikUrl(arrs[j]['arrPoke'], 'types', 1, 'type');
    }
    for (let k = 0; k < 6; k++) {
        let l = k + 1;
        arrs[j]['arrStat' + l] = await fetchDataByDynamikUrl(arrs[j]['arrPoke'], 'stats', k, 'stat');
    }
    noticeNameForSearch(j);
    allPokes.push({});
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
    if (index1st == 'types' || index1st == 'stats') {
        let dynamicUrl = array[index1st][position][index2nd]['url'];
        return dynamicUrl;
    }
    if (index1st == 'abilities') {
        let dynamicUrlIndex = array[index1st].length - 1;
        let dynamicUrl = array[index1st][dynamicUrlIndex][index2nd]['url'];
        return dynamicUrl;
    }
}


function checkIfSlot2(i, index) {
    if (arrs[i]['arrPoke']['types'].length == 2) {
        if (index == 'de') {
            return getGermanData(arrs[i]['arrType2'], 'names', 'name');
        } else {
            return arrs[i]['arrType2']['name'];
        }
    } else {
        return '';
    }
}


function noticeNameForSearch(j) {
    loadedPokeNames.push(getGermanData(arrs[j]['arrSpec'], 'names', 'name'));
}


function fillSlot1(i, slot1) {
    document.getElementById('base-type1' + i).innerHTML = slot1;
}


function showSlot2(i) {
    if (allPokes[i]['pokeTypes'][1] !== '') {
        document.getElementById('base-type2' + i).classList.remove('display-none');
    }
    document.getElementById('base-type2' + i).innerHTML = allPokes[i]['pokeTypes'][1];
}


function showPokeCard(i) {
    currentPokeNr = i + 1;
    document.getElementById('myPlace').style = 'overflow: hidden; height: 0px; padding: 0px';
    if (pokesLoaded == true) {
        switchContent(i);
        document.getElementById('pokedex' + i).classList.remove('display-none');
    }
}


async function changePokesToBlack(i) {
    let type1 = allPokes[i]['pokeTypesEn'][0];
    if (type1 == 'electric' || type1 == 'ice') {
        for (let j = 0; j < colorBlackIds.length; j++) {
            document.getElementById(colorBlackIds[j] + i).classList.add(`color-black`);
        }
    }
}


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


async function stylePokeBgn(i, index) {
    let pokeType = allPokes[i]['pokeTypesEn'][0];
    setBgnByType(i, index, pokeType);
}


function setBgnByType(i, index, pokeType) {
    document.getElementById(index + i).classList.add('bgn-type-' + pokeType);
}

function showPokeMinis() {
    switchContent(currentPokeNr);
}

function backToContent(i) {
    document.getElementById('myPlace').style = 'overflow: auto; height: 100%; padding: 16px';
    switchContent(i);
}

function switchContent(i) {
    document.getElementById('pokedex' + i).classList.toggle('display-none');
    document.getElementById('overlay').classList.toggle('display-none');
    document.getElementById('pokeCardContent').classList.toggle('display-none');
    topFunction();
}

function topFunction() {
    document.documentElement.scrollTop = 0;
}


function searchBy(array, searchIndex, pushIndex) {
    togglePokeMinis();
    for (let i = 0; i < array.length; i++) {
        let searchElement = document.getElementById(searchIndex).value;
        searchElement = searchElement.toLowerCase();
        let compareElement = array[i].toLowerCase();
        let result = compareElement.startsWith(searchElement);
        if (result == true) {
            document.getElementById(pushIndex + i).classList.remove('display-none')
        }
    }
}


function togglePokeMinis() {
    for (let i = 0; i < allPokes.length; i++) {
        document.getElementById('pokeMiniButton' + i).classList.toggle('display-none')
    }
}


function showCurrentCardById(cardId, i, slot1) {
    setAllCardsToDefault(i);
    setCurrentCardToActiv(cardId);
    setCurrentSlideOnActiv(cardId, i, slot1);
}


function setAllCardsToDefault(i) {
    for (let k = 1; k <= amountSlides; k++) {
        let cardToHide = 'card' + k + i;
        document.getElementById(cardToHide).classList.add('display-none');
    }
}


function setCurrentCardToActiv(cardId) {
    document.getElementById(cardId).classList.remove('display-none');
}


function setCurrentSlideOnActiv(cardId, i, slot1) {
    setAllSliderToDefault(i, slot1);
    document.getElementById('btn-' + cardId).classList.remove('bgn-' + slot1);
    document.getElementById('btn-' + cardId).classList.add('bgn-slot-type-' + slot1);
}


function setAllSliderToDefault(i, slot1) {
    for (let j = 1; j <= amountSlides; j++) {
        let sliderId = 'btn-card' + j + i;
        document.getElementById(sliderId).classList.remove('bgn-slot-type-' + slot1);
        document.getElementById(sliderId).classList.remove('bgn-hover-type-' + slot1);
        document.getElementById(sliderId).classList.add('bgn-' + slot1);
    }
}


function stylePokeTop(i) {
    stylePokeSlot(i, 'bgn-slot-type-' + allPokes[i]['pokeTypesEn'][0], 'base-type1');
    if (arrs[i]['arrPoke']['types'].length == 2) {
        stylePokeSlot(i, 'bgn-slot-type-' + allPokes[i]['pokeTypesEn'][1], 'base-type2');
    }
    document.getElementById('btn-fill0' + i).classList.add('bgn-type-' + allPokes[i]['pokeTypesEn'][0]);
    document.getElementById('btn-fill1' + i).classList.add('bgn-type-' + allPokes[i]['pokeTypesEn'][0]);
}


function stylePokeSlot(i, bgnSlotType, index) {
    document.getElementById(index + i).classList.add(`${bgnSlotType}`);
}


async function stylePokeNavigation(i) {
    for (let cardNr = 1; cardNr <= 2; cardNr++) {
        document.getElementById('btn-card' + cardNr + i).classList.add('bgn-' + allPokes[i]['pokeTypesEn'][0]);
    }
    document.getElementById('btn-card' + 1 + i).classList.remove('bgn-' + allPokes[i]['pokeTypesEn'][0]);
    document.getElementById('btn-card' + 1 + i).classList.add('bgn-slot-type-' + allPokes[i]['pokeTypesEn'][0]);
}


function hoverNavigationOver(cardNr, i, slot1) {
    document.getElementById('btn-card' + cardNr + i).classList.add('bgn-hover-type-' + slot1);
}


function hoverNavigationOut(cardNr, i, slot1) {
    document.getElementById('btn-card' + cardNr + i).classList.remove('bgn-hover-type-' + slot1);
}


function perCent(value) {
    let valuePerCent = value / 255 * 100;
    return valuePerCent;
}


function renderProgressLine(i, valuePerCent, j) {
    document.getElementById('progress-about-bar-inner' + j + i).style = `width: ${valuePerCent}%`;
}


function getGermanData(array, index1st, index2nd) {
    let indexGermanData = searchIndexOfGermanData(array, index1st);
    let germanData = array[index1st][indexGermanData][index2nd];
    return germanData;
}


function searchIndexOfGermanData(array, index) {
    for (let j = 0; j < array[index].length; j++) {
        let language = array[index][j]['language']['name'];
        if (language == 'de') {
            let indexGermanData = j;
            j = array[index].length;
            return indexGermanData;
        }
    }
}


function format3LeftHandZeros(value) {
    value = value.toString();
    let formatValue = value.padStart(4, '0');
    return formatValue;
}


function clearSearchInput() {
    document.getElementById('searchName').value = '';
}


// "easy loading"

window.onscroll = function () {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 20) {
        initNext();
    }
}




// show next Poke
function showNextPoke(i, direction) {
    if (direction == 'left' && i > 0) {
        document.getElementById('pokedex' + i).classList.toggle('display-none');
        document.getElementById('pokedex' + (i - 1)).classList.toggle('display-none');
        currentPokeNr = currentPokeNr - 1;
    }
    if (direction == 'right' && i < allPokes.length - 1) {
        document.getElementById('pokedex' + i).classList.toggle('display-none');
        document.getElementById('pokedex' + (i + 1)).classList.toggle('display-none');
        currentPokeNr = currentPokeNr + 1;
    }
}


// set favorite
function setFavMini() {
    for (let i = 0; i < allPokes.length; i++) {
        let tester = pokesFavorites.includes(i);
        if (tester == true) {
        document.getElementById('miniFill0' + (i - 1)).classList.toggle('display-none');
        document.getElementById('miniFill1' + (i - 1)).classList.toggle('display-none');
    }
    }
}

function setFavorite(i) {
    document.getElementById(`fill0${i}`).classList.toggle('display-none');
    document.getElementById(`fill1${i}`).classList.toggle('display-none');
    document.getElementById(`miniFill0${i}`).classList.toggle('display-none');
    document.getElementById(`miniFill1${i}`).classList.toggle('display-none');
    let tester = document.getElementById(`fill0${i}`).classList.contains('display-none');
    if (tester == true) {
        addFavorite(i + 1);
    } else {
        removeFavorite(i + 1);
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