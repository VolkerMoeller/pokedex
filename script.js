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
    }
]


let resp1GeneralInfoAsJSON;
let resp2SpeciesInfoAsJSON;
let resp3AbilitiesInfoAsJSON;
let pokeCounter = 11;
let pokeCounterStep = 2;
let scrollCounter = 1;
let nextToLoadNr = 1;
let functionRunning = false;
let functionRunning2 = false;
let start = nextToLoadNr;
let end = pokeCounter;
let currentPokeNr = 1;
let beforePokeNr = currentPokeNr - 1;
let nextPokeNr = currentPokeNr + 1;
let cardIdsPokeMini = ['10', '10', '10']
let cardIdsPokeAll = ['1', '2', '3', '4']
let baseStatNames = ['Kraftpunkte', 'Angriff', 'Verteidigung', 'Sezialangriff', 'Spezialverteidigung', 'Initiative'];
let baseStatId = ['pokeKpId', 'pokeAttackId', 'pokeDefenceId', 'pokeSpecAttackId', 'pokeSpecDefenceId', 'pokeSpeedId'];


async function init() {
    await load();
    pokeMiniAll();
    pokeAll();
}


function pokeAll() {
    for (let i = 1; i < myPokesAsObject.length; i++) {
        renderPoke(i);
    }
}


async function pokeMiniAll() {
    await renderPokMini();
    await showPokeMinis();
    renderPokeMiniNavigation(1, cardIdsPokeMini);
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
            await updateCounter(i);
        }
        loadPokemonAbilitiesData();
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


async function loadPokemonAbilitiesData() {
    for (let i = nextToLoadNr; i <= myPokesAsObject.length - 1; i++) {
        let url3 = myPokesAsObject[i]['abilityUrl'];
        await defResp3(url3);
        fillMyPokeObjectWithAbilitieData(i);
    }
    save();
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
        }
    );
}


async function fillMyPokeObject(i) {
    myPokesAsObject[i]['id'] = resp1GeneralInfoAsJSON['id'];
    myPokesAsObject[i]['name'] = resp1GeneralInfoAsJSON['name'];
    myPokesAsObject[i]['nameGerman'] = resp2SpeciesInfoAsJSON['names'][searchIndexOfGerman('names')]['name'];
    myPokesAsObject[i]['slot1'] = resp1GeneralInfoAsJSON['types'][0]['type']['name'];
    myPokesAsObject[i]['slot2'] = checkIfThereIsSlot2();
    myPokesAsObject[i]['imgUrl'] = resp1GeneralInfoAsJSON['sprites']['other']['home']['front_default'];
    myPokesAsObject[i]['weight'] = resp1GeneralInfoAsJSON['weight'];
    myPokesAsObject[i]['height'] = resp1GeneralInfoAsJSON['height'];
    myPokesAsObject[i]['generaGerman'] = resp2SpeciesInfoAsJSON['genera'][searchIndexOfGerman('genera')]['genus'];
    myPokesAsObject[i]['generaFlavor'] = resp2SpeciesInfoAsJSON['flavor_text_entries'][searchIndexOfGermanGeneraFlavor('flavor_text_entries')]['flavor_text'];
    myPokesAsObject[i]['abilityGerman'] = '';
    myPokesAsObject[i]['abilityUrl'] = resp1GeneralInfoAsJSON['abilities'][0]['ability']['url'];
    myPokesAsObject[i]['abilityFlavor'] = '';
}


function fillMyPokeObjectWithAbilitieData(i) {
    myPokesAsObject[i]['abilityGerman'] = resp3AbilitiesInfoAsJSON['names'][searchIndexOfGermanAbilities('names')]['name'];
    myPokesAsObject[i]['abilityFlavor'] = resp3AbilitiesInfoAsJSON['flavor_text_entries'][searchIndexOfGermanAbilities('flavor_text_entries')]['flavor_text'];
}


async function checkIfThereIsSlot2() {
    if (resp1GeneralInfoAsJSON['types'][1]) {
        let slot2FromServer = resp1GeneralInfoAsJSON['types'][1]['type']['name'];
        return slot2FromServer;
    } else {
        let slot2FromServer = '';
        return slot2FromServer;
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


function searchIndexOfGermanAbilities(index) {
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