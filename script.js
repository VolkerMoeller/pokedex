let myPokesAsObject = [
    {
        "id": '',
        "name": '',
        "nameGerman": '',
        "slot1": '',
        "slot2": '',
        "imgUrl": '',
        "weight": '',
        "height": '',
        "generaGerman": '',
        "generaFlavor": '',
        "abilityGerman": '',
        "abilityUrl": '',
        "abilityFlavor": '',
        "stats": [],
        "statsGerman": [],
        "statsGermanUrl": [],
    }
]


let resp1GeneralInfoAsJSON;
let resp2SpeciesInfoAsJSON;
let resp3AbilitiesInfoAsJSON;
let resp4StatsInfoAsJSON;
let pokeCounter = 11;
let pokeCounterStep = 1;
let scrollCounter = 1;
let nextToLoadNr = 1;
let functionRunning = false;
let functionRunning2 = false;
let start = nextToLoadNr;
let end = pokeCounter;
let currentPokeNr = 1;
let beforePokeNr = currentPokeNr - 1;
let nextPokeNr = currentPokeNr + 1;
// let cardIdsPokeMini = ['10', '10', '10']
let cardIdsPokeMini = ['10', '20', '30']
let cardIdsPokeAll = ['1', '2', '3', '4']
// let baseStatNames = ['Kraftpunkte', 'Angriff', 'Verteidigung', 'Sezialangriff', 'Spezialverteidigung', 'Initiative'];
// let baseStatId = ['pokeKpId', 'pokeAttackId', 'pokeDefenceId', 'pokeSpecAttackId', 'pokeSpecDefenceId', 'pokeSpeedId'];
let amountRenderdPokes = 0;
let indexOfGermanData;
let slot2FromServer;
let millisec = 0;
let amountPokes = 1010;
let onScrollLoading = true;
let pokesFavorites =[];

async function init() {
    await load();
    await pokeMiniAll();
    pokeAll();
}


async function pokeAll() {
    for (let i = 1; i < myPokesAsObject.length; i++) {
        await renderPoke(i);
    }
}


async function pokeMiniAll() {
    await renderPokMini();
    await showPokeMinis();
    renderPokeMiniNavigation(cardIdsPokeMini);
    renderPokMiniSearch();
    renderPokMiniFavorites();
}

async function showPokeMinis() {
    if (myPokesAsObject.length > 1) {
        showSavedPokeMini(1, myPokesAsObject.length - 1);
    } else {
        showNextPokeMini(start, end);
    }
}


async function showNextPokeMini(start, end) {
    if (functionRunning == false) {
        functionRunning == true;
        for (let i = start; i <= end; i++) {
            await loadPokemonData(i);
            await buildMyPokeObject(i);
            await fillMyPokeObject(i);
            await renderPokeMini(i);
            await renderPoke(i);
            await updateCounter(i);
        }
        loadPokemonAbilitiesAndStatsData();
        start = end + 1;
        end = end + pokeCounterStep;
    }
    functionRunning == false;
}


async function showSavedPokeMini(start, end) {
    if (functionRunning == false) {
        functionRunning == true;
        for (let i = start; i <= end; i++) {
            await renderPokeMini(i);
            updateCounter(i);
        }
        start = end + 1;
        end = end + pokeCounterStep;
    }
    functionRunning == false;
}


async function loadPokemonAbilitiesAndStatsData() {
    for (let i = nextToLoadNr; i <= myPokesAsObject.length - 1; i++) {
        let url3 = myPokesAsObject[i]['abilityUrl'];
        await defResp3(url3);
        fillMyPokeObjectWithAbilitieData(i);
        fillMyPokeObjectWithStatsData(i);
        await getStatsGermanNames(i);
    }
    save();
}


async function getStatsGermanNames(i) {
    for (let j = 0; j < resp1GeneralInfoAsJSON['stats'].length; j++) {
        let url4 = myPokesAsObject[i]['statsGermanUrl'][j];
        await defResp4(url4);
        fillMyPokeObjectWithStatsDataGerman(i);
    }
}


async function updateCounter(i) {
    document.getElementById('miniPokesCounter').innerHTML = generateHTMLCounter(i);

}


async function loadPokemonData(i) {
    const url1 = 'https://pokeapi.co/api/v2/pokemon/' + i;
    const url2 = 'https://pokeapi.co/api/v2/pokemon-species/' + i;
    await Promise.all([defResp1(url1), defResp2(url2)]);
}


async function defResp1(url1) {
    let resp1AsSthFromServer = await fetch(url1);
    resp1GeneralInfoAsJSON = await resp1AsSthFromServer.json();
}


async function defResp2(url2) {
    let resp2AsSthFromServer = await fetch(url2);
    resp2SpeciesInfoAsJSON = await resp2AsSthFromServer.json();
}


async function defResp3(url3) {
    let resp3AsSthFromServer = await fetch(url3);
    resp3AbilitiesInfoAsJSON = await resp3AsSthFromServer.json();
}

async function defResp4(url4) {
    let resp4AsSthFromServer = await fetch(url4);
    resp4StatsInfoAsJSON = await resp4AsSthFromServer.json();
}


async function buildMyPokeObject() {
    myPokesAsObject.push(
        {
            "id": '',
            "name": '',
            "nameGerman": '',
            "slot1": '',
            "slot2": '',
            "imgUrl": '',
            "weight": '',
            "height": '',
            "generaGerman": '',
            "generaFlavor": '',
            "abilityGerman": '',
            "abilityUrl": '',
            "abilityFlavor": '',
            "stats": [],
            "statsGerman": [],
            "statsGermanUrl": [],
        }
    );
}


async function fillMyPokeObject(i) {
    myPokesAsObject[i]['id'] = resp1GeneralInfoAsJSON['id'];
    myPokesAsObject[i]['name'] = resp1GeneralInfoAsJSON['name'];
    searchIndexOfGermanData(resp2SpeciesInfoAsJSON, 'names');
    myPokesAsObject[i]['nameGerman'] = resp2SpeciesInfoAsJSON['names'][indexOfGermanData]['name'];
    myPokesAsObject[i]['slot1'] = resp1GeneralInfoAsJSON['types'][0]['type']['name'];
    checkIfThereIsSlot2();
    myPokesAsObject[i]['slot2'] = slot2FromServer;
    myPokesAsObject[i]['imgUrl'] = resp1GeneralInfoAsJSON['sprites']['other']['home']['front_default'];
    myPokesAsObject[i]['weight'] = resp1GeneralInfoAsJSON['weight'];
    myPokesAsObject[i]['height'] = resp1GeneralInfoAsJSON['height'];
    searchIndexOfGermanData(resp2SpeciesInfoAsJSON, 'genera');
    myPokesAsObject[i]['generaGerman'] = resp2SpeciesInfoAsJSON['genera'][indexOfGermanData]['genus'];
    searchIndexOfGermanData(resp2SpeciesInfoAsJSON, 'flavor_text_entries');
    myPokesAsObject[i]['generaFlavor'] = resp2SpeciesInfoAsJSON['flavor_text_entries'][indexOfGermanData]['flavor_text'];
    myPokesAsObject[i]['abilityGerman'] = '';
    myPokesAsObject[i]['abilityUrl'] = resp1GeneralInfoAsJSON['abilities'][0]['ability']['url'];
    myPokesAsObject[i]['abilityFlavor'] = '';
    myPokesAsObject[i]['statsValues'] = [];
    myPokesAsObject[i]['statsGerman'] = [];
    myPokesAsObject[i]['statsGermanUrl'] = [];
}


function fillMyPokeObjectWithAbilitieData(i) {
    searchIndexOfGermanData(resp3AbilitiesInfoAsJSON, 'names');
    myPokesAsObject[i]['abilityGerman'] = resp3AbilitiesInfoAsJSON['names'][indexOfGermanData]['name'];
    searchIndexOfGermanData(resp3AbilitiesInfoAsJSON, 'flavor_text_entries');
    myPokesAsObject[i]['abilityFlavor'] = resp3AbilitiesInfoAsJSON['flavor_text_entries'][indexOfGermanData]['flavor_text'];
}


async function fillMyPokeObjectWithStatsData(i) {
    for (let j = 0; j < resp1GeneralInfoAsJSON['stats'].length; j++) {
        myPokesAsObject[i]['statsValues'].push(resp1GeneralInfoAsJSON['stats'][j]['base_stat']);
        myPokesAsObject[i]['statsGermanUrl'].push(resp1GeneralInfoAsJSON['stats'][j]['stat']['url']);
    }
}


async function fillMyPokeObjectWithStatsDataGerman(i) {
    searchIndexOfGermanData(resp4StatsInfoAsJSON, 'names')
    myPokesAsObject[i]['statsGerman'].push(resp4StatsInfoAsJSON['names'][indexOfGermanData]['name']);
}


async function checkIfThereIsSlot2() {
    if (resp1GeneralInfoAsJSON['types'][1]) {
        slot2FromServer = resp1GeneralInfoAsJSON['types'][1]['type']['name'];
    } else {
        slot2FromServer;
    }
}


function searchIndexOfGerman(index) {
    for (let j = 0; j < resp2SpeciesInfoAsJSON[index].length; j++) {
        const language = resp2SpeciesInfoAsJSON[index][j]['language']['name'];
        if (language == 'de') {
            return j;
        }
    }
}


function searchIndexOfGermanData(arrayAsJSON, index) {
    for (let j = 0; j < arrayAsJSON[index].length; j++) {
        const language = arrayAsJSON[index][j]['language']['name'];
        if (language == 'de') {
            indexOfGermanData = j;
            return indexOfGermanData;
        }
    }
}


function searchIndexOfGermanAbilities(index) {
    for (let j = 0; j < resp3AbilitiesInfoAsJSON[index].length; j++) {
        const language = resp3AbilitiesInfoAsJSON[index][j]['language']['name'];
        if (language == 'de') {
            return j;
        }
    }
}


function searchIndexOfGermanResp3(index) {
    for (let j = 0; j < resp3AbilitiesInfoAsJSON[index].length; j++) {
        const language = resp3AbilitiesInfoAsJSON[index][j]['language']['name'];
        if (language == 'de') {
            return j;
        }
    }
}


function searchIndexOfGermanGeneraFlavor(index) {
    for (let j = 0; j < resp2SpeciesInfoAsJSON[index].length; j++) {
        const language = resp2SpeciesInfoAsJSON[index][j]['language']['name'];
        if (language == 'de') {
            return j;
        }
    }
}


function generateHTMLCounter(i) {
    return `
    <div class="counter">${i} von 1010 geladen.</div>
    `
}