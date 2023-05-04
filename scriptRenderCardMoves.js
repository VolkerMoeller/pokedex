let pokemonUrl = 'https://pokeapi.co/api/v2/pokemon/';
let currentPokeArray = [];


async function initRenderMoves(i) {
    let url = pokemonUrl + i;
    await loadCurrentPokeArray(url);
    renderMoves(i);
}


async function loadCurrentPokeArray(url) {
    let response = await fetch(url);
    let responseAsJSON = await response.json();
    currentPokeArray = responseAsJSON;
    return currentPokeArray;
}


async function renderMoves(i){
    let moveInfoUrl = currentPokeArray['moves'][0]['move']['url'];
    await loadCurrentPokeArray(moveInfoUrl);
    console.log (currentPokeArray);
    searchGermanMove(i)
}


async function searchGermanMove(i) {
    for (let j = 0; j < currentPokeArray['names'].length; j++) {
        let language = currentPokeArray['names'][j]['language']['name'];
        getGermanMove(language, i, j);
    }
}


function getGermanMove(language, i, j) {
    if (language == 'de') {
        let germanMove = currentPokeArray['names'][j]['name'];
        renderMove(germanMove, i);
    }
}


function renderMove(germanMove, i) {
        document.getElementById('card4' + i).innerHTML += `<div>${germanMove}</div>`;
}

// let baseStatName = ['Kraftpunkte', 'Angriff', 'Verteidigung', 'Sezialangriff', 'Spezialverteidigung', 'Initiative'];
// let baseStatId = ['pokeKpId','pokeAttackId','pokeDefenceId', 'pokeSpecAttackId', 'pokeSpecDefenceId', 'pokeSpeedId'];


// async function renderPokeCardBaseStats(i) {
//     await loadCurrentPoke(i);
//     for (let j = 0; j < baseStatName.length; j++) {
//         let value = currentPoke['stats'][j]['base_stat'];
//         let valuePerCent = perCent(value);
//         let id = baseStatId[j] + i;
//         renderStatsAndProgressLine(i, baseStatName[j], value, valuePerCent, id);   
//     }
// }


// function renderStatsAndProgressLine(i, name, value, valuePerCent, id) {
//     renderStatsLine(i, name, value, id);
//     renderProgressLine(valuePerCent, id);
// }


// function renderStatsLine(i, name, absoluteValue, id) {
// }


// function perCent(value) {
//     let valuePerCent = value / 255 * 100;
//     return valuePerCent;
// }


// function renderProgressLine(value, id) {
//     document.getElementById(id).innerHTML += `<div class="progress-stats" style="width: ${value}%"></div>`;
// }