let pokes = [
    {
        "pokeId": [],
        "pokeName": [],
        "pokeNameGerman": [],
        "pokeSlot1": [],
        "pokeSlot2": [],
        "pokeImg": [],
        "pokeWeight": [],
        "pokeHeight": [],
        "pokeSpecie": [],
        "pokeFlavors": [],
        "pokeAbilityURL": [],
        "pokeAbilities": [],
        "pokeAbilityFlavors": [],
        "pokeMoveURL": [],
        "pokeMoveName": [],
    }
];

let pokesLoaded = [
    {
        "pokeId": [],
        "pokeName": [],
        "pokeNameGerman": [],
        "pokeSlot1": [],
        "pokeSlot2": [],
        "pokeImg": [],
        "pokeWeight": [],
        "pokeHeight": [],
        "pokeSpecie": [],
        "pokeFlavors": [],
        "pokeAbilities": [],
        "pokeAbilityURL": [],
        "pokeAbilityFlavors": [],
        "pokeMoveURL": [],
        "pokeMoveName": [],
    }
];

let pokesFavorites = [];

let functionRunning = false;
let currentPoke = [];
let currentPokeNr = 1;
let beforePokeNr = currentPokeNr - 1;
let nextPokeNr = currentPokeNr + 1;
let beginPokeNr = 1;
let count = 3;
let endPokeNr = beginPokeNr + count;
let searchPokeNr = 0;
let searchingPoke = false;
let amountPokes = 1010;
let amountLoadedPokes = 0;
let redundancy = false;
let currentPokeNrLeft200;
let beforePokeNrLeft200;
let nextPokeNrLeft200;
let millisec = 0;
let currentWait = 550;
let currentSpecie = [];
let currentAbility = [];
let currentIndex = '';
let amountOfPokesToLoad = 1;
let amountRenderdPokes = 0;
let currentEvolution = [];
let currentGermanStartPokeName = [];
let currentGermanEvolut1stName = [];
let currentGermanEvolut2ndName = [];

async function initPokemon() {
    document.getElementById('pokedex-all').innerHTML = '';
    await load();
    if (pokes.length > 1) {
        await loadAndShowSavedPokes();
    }
    await showNextCountPokes();
    updateAmountPokesAndProgress();
    loadFavorites();
    await renderPokeMinisAll();
}


async function loadAndShowSavedPokes() {
    await load();
    setGlobalValuesBeforePromisesSavedPokes();
    let promises = [promise(resetPokesLoaded()), promise(renderPokes()), promise(updateParam()), promise(showCurrentPoke(currentPokeNr))];
    await Promise.all(promises);
    setGlobalValuesAfterPromisesSavedPokes();
    updateAmountPokesAndProgress();
}


function setGlobalValuesBeforePromisesSavedPokes() {
    amountOfPokesToLoad = pokes.length + 3;
    endPokeNr = pokes.length - 1;
}


function setGlobalValuesAfterPromisesSavedPokes() {
    endPokeNr = beginPokeNr + count;
    amountLoadedPokes = pokes.length - 1;
}


async function promise(func) {
    let promise = new Promise((resolve, reject) => {
        resolve(func);
    });
    let result = await promise;
    return result;
}


async function showNextCountPokes() {
    if (!functionRunning) {
        functionRunning = true;
        await promise(getNextCountPokes());
        await promise(sortPokesLoaded());
        await promise(checkRedundancy());
        if (redundancy == true) {
            await promise(resetPokesLoaded());
            return;
        } else {
            let promises = [promise(pushPokesLoadedToPokes()), save(), promise(resetPokesLoaded()), promise(renderPokes()), promise(updateParam()), promise(showCurrentPoke(currentPokeNr))];
            await Promise.all(promises);
        }
        amountLoadedPokes = pokes.length - 1;
        redundancy == false;
    }
    functionRunning = false;
    updateAmountPokesAndProgress()
}


async function promiseWait(currentWait) {
    let promise = new Promise((resolve, reject) => {
        setTimeout(() => resolve('wait done'), currentWait);
    });
    let result = await promise;
    return result;
}


function renderPokes() {
    for (let i = beginPokeNr; i <= endPokeNr; i++) {
        renderPoke(i);
    }
}


async function getNextCountPokes() {
    for (let i = beginPokeNr; i <= endPokeNr; i++) {
        await loadCurrentPoke(i);
        addToPokesLoaded();
    }
}


async function sortPokesLoaded() {
    pokesLoaded.splice(0, 1);
    pokesLoaded.sort(function (a, b) { return a.pokeId - b.pokeId });
}


async function pushPokesLoadedToPokes() {
    for (let i = 0; i < pokesLoaded.length; i++) {
        pokes.push(
            {
                "pokeId": [pokesLoaded[i]['pokeId'][0]],
                "pokeName": [pokesLoaded[i]['pokeName'][0]],
                "pokeSlot1": [pokesLoaded[i]['pokeSlot1'][0]],
                "pokeSlot2": [pokesLoaded[i]['pokeSlot2'][0]],
                "pokeImg": [pokesLoaded[i]['pokeImg'][0]],
                "pokeWeight": [pokesLoaded[i]['pokeWeight'][0]],
                "pokeHeight": [pokesLoaded[i]['pokeHeight'][0]],
                "pokeSpecie": [pokesLoaded[i]['pokeSpecie'][0]],
                "pokeFlavors": [pokesLoaded[i]['pokeFlavors'][0]],
                "pokeAbilities": [pokesLoaded[i]['pokeAbilities'][0]],
                "pokeAbilityURL": [pokesLoaded[i]['pokeAbilityURL'][0]],
                "pokeAbilityFlavors": [pokesLoaded[i]['pokeAbilityFlavors'][0]],
                "pokeNameGerman": [pokesLoaded[i]['pokeNameGerman'][0]],
                "pokeMoveURL": [pokesLoaded[i]['pokeMoveURL'][0]],
                "pokeMoveName": [pokesLoaded[i]['pokeMoveName'][0]],
            }
        );
    }
}


function updateParam() {
    beginPokeNr = pokes.length;
    endPokeNr = beginPokeNr + count;
}


async function loadCurrentPoke(i) {
    let url = `https://pokeapi.co/api/v2/pokemon/${i}`;
    let response = await fetch(url);
    let responseAsJSON = await response.json();
    currentPoke = responseAsJSON;
    return currentPoke;
}


async function loadCurrentSpecie(i) {
    let url = pokes[i]['pokeSpecie'][0];
    let response = await fetch(url);
    let responseAsJSON = await response.json();
    currentSpecie = responseAsJSON;
    return currentSpecie;
}


async function loadCurrentAbility(i) {
    let url = pokes[i]['pokeAbilityURL'][0];
    let response = await fetch(url);
    let responseAsJSON = await response.json();
    currentAbility = responseAsJSON;
    return currentAbility;
}


async function loadCurrentEvolution(url) {
    let response = await fetch(url);
    let responseAsJSON = await response.json();
    currentEvolution = responseAsJSON;
    return currentEvolution;
}


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


function checkRedundancy() {
    let startValue = pokes.length - 1;
    let reference = startValue + pokesLoaded.length;
    let lastPokeIdOfLoaded = pokesLoaded[pokesLoaded.length - 1]['pokeId'][0];
    if (reference == lastPokeIdOfLoaded) {
        redundancy = false;
    } else {
        redundancy = true;
    }
}


function resetPokesLoaded() {
    pokesLoaded = [
        {
            "pokeId": [],
            "pokeName": [],
            "pokeNameGerman": [],
            "pokeSlot1": [],
            "pokeSlot2": [],
            "pokeImg": [],
            "pokeWeight": [],
            "pokeHeight": [],
            "pokeSpecie": [],
            "pokeFlavors": [],
            "pokeAbilities": [],
            "pokeAbilityURL": [],
            "pokeAbilityFlavors": [],
            "pokeMoveURL": [],
            "pokeMoveName": [],
        }
    ];
}


function showCurrentPoke(currentPokeNr) {
    document.getElementById('pokedex' + currentPokeNr).style = 'transform: translateX(0%);';
    document.getElementById('pokedex' + nextPokeNr).style = 'transform: translateX(100%);';
    if (currentPokeNr == 1) {
        return;
    } else {
        document.getElementById('pokedex' + beforePokeNr).style = 'transform: translateX(-100%);';
    }
}


function setBgnByType(pokeType, i) {
    document.getElementById('pokedex-top' + i).classList.add('bgn-type-' + pokeType);
}


function addToPokesLoaded() {
    let pokeId = currentPoke['id'];
    let pokeName = currentPoke['name'];
    let pokeNameGerman = '';
    let pokeImg = currentPoke['sprites']['other']['home']['front_default'];
    let pokeSlot1 = currentPoke['types'][0]['type']['name'];
    let pokeSlot2 = '';
    if (currentPoke['types'].length == 2) {
        pokeSlot2 = currentPoke['types'][1]['type']['name'];
    } else {
        pokeSlot2 = 'none';
    }
    let pokeWeight = currentPoke['weight'];
    let pokeHeight = currentPoke['height'];
    let pokeSpecie = currentPoke['species']['url'];
    let pokeFlavors = '';
    let pokeAbilities = currentPoke['abilities'][0]['ability']['name'];
    let pokeAbilityURL = currentPoke['abilities'][0]['ability']['url'];
    let pokeAbilityFlavors = '';
    let pokeMoveURL = '';
    let pokeMoveName = '';
    pushToPokesLoaded(pokeId, pokeName, pokeNameGerman, pokeImg, pokeSlot1, pokeSlot2, pokeWeight, pokeHeight, pokeSpecie, pokeFlavors, pokeAbilities, pokeAbilityURL, pokeAbilityFlavors, pokeMoveURL, pokeMoveName);
}


function pushToPokesLoaded(pokeId, pokeName, pokeNameGerman, pokeImg, pokeSlot1, pokeSlot2, pokeWeight, pokeHeight, pokeSpecie, pokeFlavors, pokeAbilities, pokeAbilityURL, pokeAbilityFlavors, pokeMoveURL, pokeMoveName) {
    pokesLoaded.push(
        {
            "pokeId": [pokeId],
            "pokeName": [pokeName],
            "pokeNameGerman": [pokeNameGerman],
            "pokeSlot1": [pokeSlot1],
            "pokeSlot2": [pokeSlot2],
            "pokeImg": [pokeImg],
            "pokeWeight": [pokeWeight],
            "pokeHeight": [pokeHeight],
            "pokeSpecie": [pokeSpecie],
            "pokeFlavors": [pokeFlavors],
            "pokeAbilities": [pokeAbilities],
            "pokeAbilityURL": [pokeAbilityURL],
            "pokeAbilityFlavors": [pokeAbilityFlavors],
            "pokeMoveURL": [pokeMoveURL],
            "pokeMoveName": [pokeMoveName],

        }
    )
}