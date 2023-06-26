let arrs = [];
let allPokes = [];
let loadedPokeNames = [];
let initEnd = 10;
let nextPokeNr = initEnd + 1;
let stepPokeNrs = 9;
let endPokeNr = nextPokeNr + stepPokeNrs;
let maxPokeNr = 1010;
let pokesLoaded = false;
let currentPokeNr = 0
let functionRunning = false;
let amountSlides = 2
let scrollCounter = 0;
let colorBlackIds = [
    'pokeMiniName',
    'pokeMiniId',
    'pokeMiniType1',
    'pokedex-name',
    'pokedex-id',
    'base-type1',
    'base-type2',
    'btn-card1',
    'btn-card2'
];


async function init() {
    allPokes = [];
    loadedPokeNames = [];
    document.getElementById('myPlace').innerHTML = '';
    await getData(1, initEnd);
}


async function getData(begin, end) {
    if (!functionRunning) {
        pokesLoadedOn();
        functionRunning = true;
        for (let i = begin; i <= end; i++) {
            await performServerRequests(i);
            updateAmountPokesAndProgress(i);
        }
        pushData();
        generateHTML(begin - 1, end);
        stylePokes(begin - 1, end);
        updateCountNrs(end);
        fillBaseStats(begin - 1, end);
        pokesLoadedOff();
        functionRunning = false;
    }
}


function pokesLoadedOn() {
    pokesLoaded = false;
    document.getElementById('loadBtnStart').disabled = true;
    document.getElementById('searchName').disabled = true;
    document.getElementById('loadBtnStart').classList.add('disabled');
    document.getElementById('searchName').classList.add('disabled');
    document.getElementById('overlayLoad').classList.remove('display-none');
}


function pokesLoadedOff() {
    pokesLoaded = true;
    document.getElementById('loadBtnStart').disabled = false;
    document.getElementById('searchName').disabled = false;
    document.getElementById('loadBtnStart').classList.remove('disabled');
    document.getElementById('searchName').classList.remove('disabled');
    document.getElementById('overlayLoad').classList.add('display-none');
}


function pushData() {
    for (let j = 0; j < allPokes.length; j++) {
        allPokes[j] = (
            {
                "pokeId": arrs[j]['arrPoke']['id'],
                "pokeName": getGermanData(arrs[j]['arrSpec'], 'names', 'name'),
                "pokeType1": getGermanData(arrs[j]['arrType1'], 'names', 'name'),
                "pokeType2": checkIfSlot2(j),
                "pokeType1En": arrs[j]['arrType1']['name'],
                "pokeType2En": checkIfSlot2En(j),
                "pokeImg": arrs[j]['arrPoke']['sprites']['other']['dream_world']['front_default'],
                "pokeWeight": arrs[j]['arrPoke']['weight'],
                "pokeHeight": arrs[j]['arrPoke']['height'],
                "pokeSpec": getGermanData(arrs[j]['arrSpec'], 'genera', 'genus'),
                "pokeSpecTxt": getGermanData(arrs[j]['arrSpec'], 'flavor_text_entries', 'flavor_text'),
                "pokeAbi": getGermanData(arrs[j]['arrAbi'], 'names', 'name'),
                "pokeAbiTxt": getGermanData(arrs[j]['arrAbi'], 'flavor_text_entries', 'flavor_text'),
                "pokeStat1Name": getGermanData(arrs[j]['arrStat1'], 'names', 'name'),
                "pokeStat1": arrs[j]['arrPoke']['stats'][0]['base_stat'],
                "pokeStat2Name": getGermanData(arrs[j]['arrStat2'], 'names', 'name'),
                "pokeStat2": arrs[j]['arrPoke']['stats'][1]['base_stat'],
                "pokeStat3Name": getGermanData(arrs[j]['arrStat3'], 'names', 'name'),
                "pokeStat3": arrs[j]['arrPoke']['stats'][2]['base_stat'],
                "pokeStat4Name": getGermanData(arrs[j]['arrStat4'], 'names', 'name'),
                "pokeStat4": arrs[j]['arrPoke']['stats'][3]['base_stat'],
                "pokeStat5Name": getGermanData(arrs[j]['arrStat5'], 'names', 'name'),
                "pokeStat5": arrs[j]['arrPoke']['stats'][4]['base_stat'],
                "pokeStat6Name": getGermanData(arrs[j]['arrStat6'], 'names', 'name'),
                "pokeStat6": arrs[j]['arrPoke']['stats'][5]['base_stat'],
            }
        )
    }
}


function generateHTML(begin, end) {
    generatePokeMini(begin, end);
    generatePokeMax(begin, end);
    generatePokeAbout(begin, end);
    generatePokeStats(begin, end);
}


function generatePokeMini(begin, end) {
    for (let i = begin; i < end; i++) {
        document.getElementById('myPlace').innerHTML +=
            generateHTMLPokeMini(
                i,
                format3LeftHandZeros(allPokes[i]['pokeId']),
                allPokes[i]['pokeName'],
                allPokes[i]['pokeType1'],
                allPokes[i]['pokeImg'],
            );
    }
}


function generatePokeMax(begin, end) {
    for (let i = begin; i < end; i++) {
        document.getElementById('pokeCardPlace').innerHTML +=
            generateHTMLPokeMax(
                i,
                allPokes[i]['pokeName'],
                format3LeftHandZeros(allPokes[i]['pokeId']),
                allPokes[i]['pokeType1'],
                allPokes[i]['pokeType2'],
                allPokes[i]['pokeImg'],
                allPokes[i]['pokeType1En'],
            );
    }
}


function generatePokeAbout(begin, end) {
    for (let i = begin; i < end; i++) {
        document.getElementById('card1' + i).innerHTML +=
            generateHTMLAbout(
                i,
                allPokes[i]['pokeSpec'],
                allPokes[i]['pokeWeight'],
                allPokes[i]['pokeHeight'],
                allPokes[i]['pokeAbi'],
                allPokes[i]['pokeAbiTxt'],
            );
    }
}


function generatePokeStats(begin, end) {
    for (let i = begin; i < end; i++) {
        document.getElementById('card2' + i).innerHTML +=
            generateHTMLStats(
                i,
                allPokes[i]['pokeStat1'],
                allPokes[i]['pokeStat2'],
                allPokes[i]['pokeStat3'],
                allPokes[i]['pokeStat4'],
                allPokes[i]['pokeStat5'],
                allPokes[i]['pokeStat6'],
            );
    }
}


function stylePokes(begin, end) {
    for (let i = begin; i < end; i++) {
        stylePokeBgn(i, 'pokeMini');
        stylePokeBgn(i, 'pokedex');
        showSlot2(i);
        stylePokeTop(i);
        stylePokeBottom(i);
        changePokesToBlack(i);
    }
}


async function initNext() {
    clearSearchInput();
    getData(nextPokeNr, endPokeNr);
}

function initShowNext() {
    hidePokeMinis();
    showPokeMinis();
    initNext();
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
        "arrAbi": '',
        'arrType1': '',
        'arrType2': '',
        'arrStat1': '',
        'arrStat2': '',
        'arrStat3': '',
        'arrStat4': '',
        'arrStat5': '',
        'arrStat6': '',
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


function checkIfSlot2(i) {
    if (arrs[i]['arrPoke']['types'].length == 2) {
        return getGermanData(arrs[i]['arrType2'], 'names', 'name');
    } else {
        return '';
    }
}


function checkIfSlot2En(i) {
    if (arrs[i]['arrPoke']['types'].length == 2) {
        return arrs[i]['arrType2']['name'];
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
    if (allPokes[i]['pokeType2'] !== '') {
        document.getElementById('base-type2' + i).classList.remove('display-none');
    }
    document.getElementById('base-type2' + i).innerHTML = allPokes[i]['pokeType2'];
}


function showPokeCard(i) {
    if (pokesLoaded == true) {
        switchContent(i);
        document.getElementById('pokedex' + i).classList.remove('display-none');
    }
}


function hideAllPokeCards() {
    for (let i = 1; i < allPokes.length; i++) {
        document.getElementById('pokedex' + i).classList.add('display-none');
    }
}


async function changePokesToBlack(i) {
    let type1 = allPokes[i]['pokeType1En'];
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
    let pokeType = allPokes[i]['pokeType1En'];
    setBgnByType(i, index, pokeType);
}


function setBgnByType(i, index, pokeType) {
    document.getElementById(index + i).classList.add('bgn-type-' + pokeType);
}


function switchContent(i) {
    let overlay = document.getElementById('overlay');
    let pokeCardContent = document.getElementById('pokeCardContent');
    if (overlay.classList.contains('display-none') == true) {
        switchToPokeCard(overlay, pokeCardContent);
    } else {
        switchToPokeMinis(overlay, pokeCardContent);
    }
}


function switchToPokeCard(overlay, pokeCardContent) {
    displayOn(overlay);
    displayOn(pokeCardContent);
    topFunction();
}


function switchToPokeMinis(overlay, pokeCardContent) {
    displayOff(overlay);
    displayOff(pokeCardContent);
    hideAllPokeCards();
    topFunction();
}


function displayOn(element) {
    element.classList.remove('display-none');
    element.classList.add('display-flex');
}


function displayOff(element) {
    element.classList.add('display-none');
    element.classList.remove('display-flex');
}


function topFunction() {
    document.documentElement.scrollTop = 0;
}


function searchBy(array, searchIndex, pushIndex) {
    hidePokeMinis();
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


function hidePokeMinis() {
    for (let i = 0; i < allPokes.length; i++) {
        document.getElementById('pokeMiniButton' + i).classList.add('display-none')
    }
}


function showPokeMinis() {
    for (let i = 0; i < allPokes.length; i++) {
        document.getElementById('pokeMiniButton' + i).classList.remove('display-none')
    }
}


function setFavorite(i) {
    document.getElementById(`fill0${i}`).classList.toggle('display-none');
    document.getElementById(`fill1${i}`).classList.toggle('display-none');
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
    for (let j = 1; j <= amountSlides; j++) {
        let sliderId = 'btn-card' + j + i;
        document.getElementById(sliderId).classList.remove(`${bgnActiveType}`);
        document.getElementById(sliderId).classList.remove(`${bgnHoverType}`);
        document.getElementById(sliderId).classList.add(`${bgnDefaultType}`);
    }
}


function stylePokeTop(i) {
    let bgnSlotType = 'bgn-slot-type-' + allPokes[i]['pokeType1En'];
    let bgnType = 'bgn-type-' + allPokes[i]['pokeType1En'];
    stylePokeSlot1(i, bgnSlotType);
    if (arrs[i]['arrPoke']['types'].length == 2) {
        let pokeSlot2 = allPokes[i]['pokeType2En'];
        let bgnSlotType = 'bgn-slot-type-' + pokeSlot2;
        stylePokeSlot2(i, bgnSlotType);
    }
    renderPokeFavorite(i, bgnType);
}


function stylePokeBottom(i) {
    stylePokeNavigation(i);
}


function renderPokeFavorite(i, bgnType) {
    document.getElementById('btn-fill0' + i).classList.add(`${bgnType}`);
    document.getElementById('btn-fill1' + i).classList.add(`${bgnType}`);
};


function stylePokeSlot1(i, bgnSlotType) {
    document.getElementById('base-type1' + i).classList.add(`${bgnSlotType}`);
}


function stylePokeSlot2(i, bgnSlotType) {
    document.getElementById('base-type2' + i).classList.add(`${bgnSlotType}`);
}


async function stylePokeNavigation(i) {
    let bgnSlotType = 'bgn-' + allPokes[i]['pokeType1En'];
    let bgnActiveType = 'bgn-slot-type-' + allPokes[i]['pokeType1En'];
    for (let cardNr = 1; cardNr <= 2; cardNr++) {
        document.getElementById('btn-card' + cardNr + i).classList.add(`${bgnSlotType}`);
    }
    document.getElementById('btn-card' + 1 + i).classList.remove(`${bgnSlotType}`);
    document.getElementById('btn-card' + 1 + i).classList.add(`${bgnActiveType}`);
}


function hoverNavigationOver(cardNr, i, slot1) {
    let bgnHoverType = 'bgn-hover-type-' + slot1;
    document.getElementById('btn-card' + cardNr + i).classList.add(`${bgnHoverType}`);
}


function hoverNavigationOut(cardNr, i, slot1) {
    let bgnHoverType = 'bgn-hover-type-' + slot1;
    document.getElementById('btn-card' + cardNr + i).classList.remove(`${bgnHoverType}`);
}


async function fillBaseStats(begin, end) {
    for (let k = begin; k < end; k++) {
        for (let j = 1; j <= arrs[k]['arrPoke']['stats'].length; j++) {
            let value = arrs[k]['arrPoke']['stats'][j - 1]['base_stat'];
            let valuePerCent = perCent(value);
            renderProgressLine(k, valuePerCent, j);
        }
    }
}


function perCent(value) {
    let valuePerCent = value / 255 * 100;
    return valuePerCent;
}


function renderProgressLine(i, valuePerCent, j) {
    renderProgressLine(i, valuePerCent, j);
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
        const language = array[index][j]['language']['name'];
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

window.onscroll = function () { scrollFunction() };


async function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        scrollCounter++;
        let interval = 20;
        let tester = scrollCounter % interval;
        if (tester == 0) {
            initNext();
        }
    }
}

// generate HTML
function generateHTMLPokeMini(i, id, name, type, img) {
    return /*html*/`
      <button id="pokeMiniButton${i}" class="pokeMiniButton" onclick="showPokeCard(${i})">
          <div id="pokeMini${i}" class="pokeMini">
            <div id="pokeMini1stLine${i}" class="pokeMini1stLine">
                <div id="pokeMiniName${i}" class="pokeMiniName">${name}</div>
                <div id="pokeMiniId${i}" class="pokeMiniId">#${id}</div>
                <div id="pokeMiniType1${i}" class="pokeMiniType1">${type}</div>
                  </div>
                  <div id="pokeMiniImgDiv${i}" class="pokeMiniImgDiv">
                    <img id="pokeMiniImg${i}" class="pokeMiniImg" src="${img}">
                  </div>
          </div>
      </button>
      `
}


function generateHTMLPokeMax(i, name, id, type1, type2, img, slot1) {
    return /*html*/`
      <div id="pokedex${i}" class="pokedex display-none">
        <div id="pokedex-top${i}" class="pokedex-top">
        <div>
            <button onclick="switchContent(${i})" class="btn-back">
                      <img src="./img/backspace.png">
                      </button>
                      </div>
              <div class="pokedex-above">
                  <div id="pokedex-name${i}" class="pokedex-name">${name}
                  </div>
                  <div id="pokedex-id${i}" class="pokedex-id">#${id}
                  </div>
                  </div>
              <div class="slot-line">
                  <div id="pokedex-slots${i}" class="pokedex-slots">
                    <div id="base-type1${i}" class="slot">${type1}</div>
                    <div id="base-type2${i}" class="slot display-none">${type2}</div>
                  </div>
                  <div class="favorite">
                      <div id="fill0${i}"><button id="btn-fill0${i}" class="btn-fav" onclick="setFavorite(${i})"><img id="pokeImgFavFill0${i}" src="./img/favorite_FILL0.png"></button></div>
                      <div id="fill1${i}" class="display-none"><button id="btn-fill1${i}"class="btn-fav" onclick="setFavorite(${i})"><img id="pokeImgFavFill1${i}" src="./img/favorite_FILL1.png"></button></div>
                  </div>
              </div>
              <div id="pokedex-image-place${i}" class="pokedex-image-place">
                  <div id="pokedex-image${i}" class="pokedex-image">
                  <img id="pokedex-img${i}" class="pokedex-img" src="${img}">
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


function generateHTMLAbout(i, genera, weight, height, ability, text) {
    return /*html*/`
    <div id="genera${i}" class="aboutRow">
      <div id="generaName${i}"class="aboutName">Klasse:</div>
      <div id="generaValue${i}"class="aboutValue">${genera}</div>
    </div>
    <div id="weight${i}" class="aboutRow">
      <div id="weightName${i}"class="aboutName">Gewicht:</div>
      <div id="weightValue${i}"class="aboutValue">${weight}</div>
    </div>
    <div id="height${i}" class="aboutRow">
      <div id="heightName${i}"class="aboutName">Höhe:</div>
      <div id="heightValue${i}"class="aboutValue">${height}</div>
    </div>
    <div id="ability${i}" class="aboutRow">
      <div id="abilityName${i}"class="aboutName">Fähigkeit:</div>
      <div id="abilityValue${i}"class="aboutValue">${ability}</div>
    </div>
    <div id="text${i}" class="aboutRow">
      <div id="textName${i}"class="aboutName"></div>
      <div id="textValue${i}"class="aboutValue"><i>${text}</i></div>
    </div>
      `}


function generateHTMLStats(i, hp, att, def, specAtt, specDef, speed) {
    return /*html*/`
   <div id="hp${i}" class="statRow">
        <div id="hpName${i}" class="statName">Kraftpunkte:</div>
        <div class="statValueAndProgress">
            <div id="hpValue${i}" class="statValue">${hp}</div>
            <div class="progress-about-bar">
                <div id="progress-about-bar-inner1${i}" class="progress-about-bar-inner" style="width: 0%;"></div>
            </div>
        </div>
    </div>
    <div id="attack${i}" class="statRow">
        <div id="attackName${i}" class="statName">Angriff:</div>
        <div class="statValueAndProgress">
            <div id="attackValue${i}" class="statValue">${att}</div>
            <div class="progress-about-bar">
                <div id="progress-about-bar-inner2${i}" class="progress-about-bar-inner" style="width: 0%;"></div>
            </div>
        </div>
    </div>
    <div id="defence${i}" class="statRow">
        <div id="defenceName${i}" class="statName">Verteidigung:</div>
        <div class="statValueAndProgress">
            <div id="defenceValue${i}" class="statValue">${def}</div>
            <div class="progress-about-bar">
                <div id="progress-about-bar-inner3${i}" class="progress-about-bar-inner" style="width: 0%;"></div>
            </div>
        </div>
    </div>
    <div id="specAttack${i}" class="statRow">
        <div id="specAttackName${i}" class="statName">Spezialangriff:</div>
        <div class="statValueAndProgress">
            <div id="specAttackValue${i}" class="statValue">${specAtt}</div>
            <div class="progress-about-bar">
                <div id="progress-about-bar-inner4${i}" class="progress-about-bar-inner" style="width: 0%;"></div>
            </div>
        </div>
    </div>
    <div id="specDef${i}" class="statRow">
        <div id="specDefName${i}" class="statName">Spezialverteid.:</div>
        <div class="statValueAndProgress">
            <div id="specDefValue${i}" class="statValue">${specDef}</div>
            <div class="progress-about-bar">
                <div id="progress-about-bar-inner5${i}" class="progress-about-bar-inner" style="width: 0%;"></div>
            </div>
        </div>
    </div>
    <div id="speed${i}" class="statRow">
        <div id="speedName${i}" class="statName">Initiative:</div>
        <div class="statValueAndProgress">
            <div id="speedValue${i}" class="statValue">${speed}</div>
            <div class="progress-about-bar">
                <div id="progress-about-bar-inner6${i}" class="progress-about-bar-inner" style="width: 0%;"></div>
            </div>
        </div>
    </div>
    `}