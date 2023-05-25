let myPokesAsObject = [
    {
        "id": 0,
        "name": 'null',
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
        "speciesUrl": '',
        "evolutionUrl": '',
        "evolutionChainUrlFirst": '',
        "evolutionChainUrlSecond": '',
        "evolutionChainUrlThird": '',
        "evolutionChainNames": [],
        "evolutionChainIds": [],
        "statsGerman": [],
        "statsGermanUrl": [],
        "moveUrls": [],
        "moveNames": [],
        "moveFlavors": [],
    }
];


let resp1GeneralInfoAsJSON;
let resp2SpeciesInfoAsJSON;
let resp3AbilitiesInfoAsJSON;
let resp4StatsInfoAsJSON;
let resp5EvolutionInfoAsJSON;
let resp6EvolutionChainInfoAsJSON;
let resp7EvolutionChainFirstInfoAsJSON;
let resp8EvolutionChainSecondInfoAsJSON;
let resp9EvolutionChainThirdInfoAsJSON;
let resp10MoveInfoAsJSON;
let pokeCounter = 2;
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
let cardIdsPokeMini = ['10', '20', '30']
let cardIdsPokeAll = ['1', '2', '3', '4']
let amountRenderdPokes = 0;
let indexOfGermanData;
let slot2FromServer;
let millisec = 0;
let amountPokes = 1010;
let onScrollLoading = true;
let pokesFavorites = [];
let baseStatNames = ['Kraftpunkte', 'Angriff', 'Verteidigung', 'Sezialangriff', 'Spezialverteidigung', 'Initiative'];
let baseStatId = ['pokeKpId', 'pokeAttackId', 'pokeDefenceId', 'pokeSpecAttackId', 'pokeSpecDefenceId', 'pokeSpeedId'];
let currentGermanStartPokeName;
let currentGermanEvolut1stName;
let currentGermanEvolut2ndName;
let countMoves = 5;


async function init() {
    await load();
    await startMyPokesAsObject();
    await renderMyPokes();
}


async function getNextPokes() {
    if (functionRunning == false) {
        functionRunning == true;
        await startMyPokesAsObject();
        await renderMyPokes();  
    }
    functionRunning == false;
}


async function renderMyPokes() {
    await pokeMiniAll();
    await pokeSliderAll();
};


async function startMyPokesAsObject() {
    if (functionRunning == false) {
        functionRunning == true;
        let start = myPokesAsObject.length;
        if (myPokesAsObject.length == 1) {
            pokeCounterStep = 2;
        }
        let end = myPokesAsObject.length + pokeCounterStep;
        for (let pokeNr = start; pokeNr <= end; pokeNr++) {
            await makeMyPokeObjekt(pokeNr);
            // das goldene await!!!
        }
        console.log(myPokesAsObject);
    }
    functionRunning == false;
}


async function makeMyPokeObjekt(i) {
    await loadBasicPokemonData(i);
    await buildMyPokeObject();
    await fillAndSavePokeObject(i);
    await loadPokemonDataAblility(i);
    await fillMyPokeObjectWithAbilitieData(i);
    await fillMyPokeObjectWithStatsData(i);
    await getStatsGermanNames(i);

    await loadPokemonDataEvolution(i);

    await fillMyPokeObjectWithEvolutionDataFirstUrl(i);
    await loadEvolutionDataFirst(i);
    await fillMyPokeObjectWithEvolutionDataFirstName(i);

    await fillMyPokeObjectWithEvolutionDataSecondUrl(i);
    await loadEvolutionDataSecond(i);
    await fillMyPokeObjectWithEvolutionDataSecondName(i);


    if (myPokesAsObject[i]['evolutionChainIds'].length > 2) {
        await fillMyPokeObjectWithEvolutionDataThirdUrl(i);
        await loadEvolutionDataThird(i);
        await fillMyPokeObjectWithEvolutionDataThirdName(i);
    }


    await fillMyPokeObjectWithMoveUrls(i);
    await loadAndFillMovesData(i);


    await save();
}


async function fillMyPokeObjectWithEvolutionDataFirstName(i) {
    searchIndexOfGermanData(resp7EvolutionChainFirstInfoAsJSON, 'names');
    myPokesAsObject[i]['evolutionChainNames'].push(resp7EvolutionChainFirstInfoAsJSON['names'][indexOfGermanData]['name']);
    myPokesAsObject[i]['evolutionChainIds'].push(resp7EvolutionChainFirstInfoAsJSON['id']);
}


async function fillMyPokeObjectWithEvolutionDataSecondName(i) {
    searchIndexOfGermanData(resp8EvolutionChainSecondInfoAsJSON, 'names');
    myPokesAsObject[i]['evolutionChainNames'].push(resp8EvolutionChainSecondInfoAsJSON['names'][indexOfGermanData]['name']);
    myPokesAsObject[i]['evolutionChainIds'].push(resp8EvolutionChainSecondInfoAsJSON['id']);
}


async function fillMyPokeObjectWithEvolutionDataThirdName(i) {
    searchIndexOfGermanData(resp9EvolutionChainThirdInfoAsJSON, 'names');
    myPokesAsObject[i]['evolutionChainNames'].push(resp9EvolutionChainThirdInfoAsJSON['names'][indexOfGermanData]['name']);
    myPokesAsObject[i]['evolutionChainIds'].push(resp9EvolutionChainThirdInfoAsJSON['id']);
}


async function loadEvolutionDataFirst(i) {
    let url7 = myPokesAsObject[i]['evolutionChainUrlFirst'];
    await defResp7(url7);
}


async function loadEvolutionDataSecond(i) {
    let url8 = myPokesAsObject[i]['evolutionChainUrlSecond'];
    await defResp8(url8);
}


async function loadEvolutionDataThird(i) {
    let url9 = myPokesAsObject[i]['evolutionChainUrlThird'];
    await defResp9(url9);
}


async function loadAndFillMovesData(i) {
    for (let j = 0; j < myPokesAsObject[i]['moveUrls'].length; j++) {
        let url10 = myPokesAsObject[i]['moveUrls'][j];
        await defResp10(url10);
        searchIndexOfGermanData(resp10MoveInfoAsJSON, 'names');
        myPokesAsObject[i]['moveNames'].push(resp10MoveInfoAsJSON['names'][indexOfGermanData]['name']);
        searchIndexOfGermanData(resp10MoveInfoAsJSON, 'flavor_text_entries');
        myPokesAsObject[i]['moveFlavors'].push(resp10MoveInfoAsJSON['flavor_text_entries'][indexOfGermanData]['flavor_text']);
    }
}


async function fillMyPokeObjectWithEvolutionDataFirstUrl(i) {
    myPokesAsObject[i]['evolutionChainUrlFirst'] = resp5EvolutionInfoAsJSON['chain']['species']['url'];
}


async function fillMyPokeObjectWithEvolutionDataSecondUrl(i) {
    if (resp5EvolutionInfoAsJSON['chain']['evolves_to'].length >= 1) {
        myPokesAsObject[i]['evolutionChainUrlSecond'] = resp5EvolutionInfoAsJSON['chain']['evolves_to'][0]['species']['url'];
    }
}


async function fillMyPokeObjectWithEvolutionDataThirdUrl(i) {
    if (resp5EvolutionInfoAsJSON['chain']['evolves_to'][0]['evolves_to'].length >= 1) {
        myPokesAsObject[i]['evolutionChainUrlThird'] = resp5EvolutionInfoAsJSON['chain']['evolves_to'][0]['evolves_to'][0]['species']['url'];
    }
}


async function fillMyPokeObjectWithMoveUrls(i) {
    for (let j = 0; j < countMoves; j++) {
        if (resp1GeneralInfoAsJSON['moves'].length >= j) {
            myPokesAsObject[i]['moveUrls'].push(resp1GeneralInfoAsJSON['moves'][j]['move']['url']);
        }
    }
}


async function fillAndSavePokeObject(i) {
    await fillMyPokeObject(i);
    await save();
};


async function loadPokemonDataAblility(i) {
    let url3 = myPokesAsObject[i]['abilityUrl'];
    await defResp3(url3);
};


async function loadPokemonDataEvolution(i) {
    let url5 = myPokesAsObject[i]['evolutionUrl'];
    await defResp5(url5);
};


async function loadPokemonDataEvolutionChain(i) {
    let url6 = myPokesAsObject[i]['evolutionChainUrlFirst'];
    await defResp6(url6);
};


async function pokeSliderAll() {
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
    }
}


async function showNextPokeMini(start, end) {
    if (functionRunning == false) {
        functionRunning == true;
        for (let i = start; i <= end; i++) {
            await loadBasicPokemonData(i);
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
        await fillMyPokeObjectWithAbilitieData(i);
        await fillMyPokeObjectWithStatsData(i);
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


async function loadBasicPokemonData(i) {
    const url1 = 'https://pokeapi.co/api/v2/pokemon/' + i;
    const url2 = 'https://pokeapi.co/api/v2/pokemon-species/' + i;
    await Promise.all([defResp1(url1), defResp2(url2)]);
    return resp1GeneralInfoAsJSON, resp2SpeciesInfoAsJSON;
}


async function defResp1(url1) {
    let resp1AsSthFromServer = await fetch(url1);
    resp1GeneralInfoAsJSON = await resp1AsSthFromServer.json();
    return resp1AsSthFromServer;
}


async function defResp2(url2) {
    let resp2AsSthFromServer = await fetch(url2);
    resp2SpeciesInfoAsJSON = await resp2AsSthFromServer.json();
    return resp2AsSthFromServer;
}


async function defResp3(url3) {
    let resp3AsSthFromServer = await fetch(url3);
    resp3AbilitiesInfoAsJSON = await resp3AsSthFromServer.json();
}


async function defResp4(url4) {
    let resp4AsSthFromServer = await fetch(url4);
    resp4StatsInfoAsJSON = await resp4AsSthFromServer.json();
}


async function defResp5(url5) {
    let resp5AsSthFromServer = await fetch(url5);
    resp5EvolutionInfoAsJSON = await resp5AsSthFromServer.json();
}


async function defResp6(url6) {
    let resp6AsSthFromServer = await fetch(url6);
    resp6EvolutionChainInfoAsJSON = await resp6AsSthFromServer.json();
}


async function defResp7(url7) {
    let resp7AsSthFromServer = await fetch(url7);
    resp7EvolutionChainFirstInfoAsJSON = await resp7AsSthFromServer.json();
}


async function defResp8(url8) {
    let resp8AsSthFromServer = await fetch(url8);
    resp8EvolutionChainSecondInfoAsJSON = await resp8AsSthFromServer.json();
}


async function defResp9(url9) {
    let resp9AsSthFromServer = await fetch(url9);
    resp9EvolutionChainThirdInfoAsJSON = await resp9AsSthFromServer.json();
}


async function defResp10(url10) {
    let resp10AsSthFromServer = await fetch(url10);
    resp10MoveInfoAsJSON = await resp10AsSthFromServer.json();
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
            "speciesUrl": '',
            "evolutionUrl": '',
            "evolutionChainUrlFirst": '',
            "evolutionChainNames": [],
            "evolutionChainIds": [],
            "statsGerman": [],
            "statsGermanUrl": [],
            "moveUrls": [],
            "moveNames": [],
            "moveFlavors": [],
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
    myPokesAsObject[i]['speciesUrl'] = resp1GeneralInfoAsJSON['species']['url'];
    myPokesAsObject[i]['evolutionUrl'] = resp2SpeciesInfoAsJSON['evolution_chain']['url'];
    myPokesAsObject[i]['evolutionChainUrlFirst'] = '';
    myPokesAsObject[i]['statsGerman'] = [];
    myPokesAsObject[i]['statsGermanUrl'] = [];
}


async function fillMyPokeObjectWithAbilitieData(i) {
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


async function fillMyPokeObjectWithSpeciesDataGerman(i) {
    searchIndexOfGermanData(resp2SpeciesInfoAsJSON, 'names')
    myPokesAsObject[i]['statsGerman'].push(resp2SpeciesInfoAsJSON['names'][indexOfGermanData]['name']);
}


async function checkIfThereIsSlot2() {
    if (resp1GeneralInfoAsJSON['types'][1]) {
        slot2FromServer = resp1GeneralInfoAsJSON['types'][1]['type']['name'];
    } else {
        slot2FromServer = '';
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

// 

async function loadGermanStartPokeName(url) {
    let response = await fetch(url);
    let responseAsJSON = await response.json();
    currentGermanStartPokeName = responseAsJSON;
    return currentGermanStartPokeName;
}


async function loadGermanEvolut1stName(url) {
    let response = await fetch(url);
    let responseAsJSON = await response.json();
    currentGermanEvolut1stName = responseAsJSON;
    return currentGermanEvolut1stName;
}


async function loadGermanEvolut2ndName(url) {
    let response = await fetch(url);
    let responseAsJSON = await response.json();
    currentGermanEvolut2ndName = responseAsJSON;
    return currentGermanEvolut2ndName;
}