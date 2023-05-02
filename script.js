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


async function initPokemon() {
    document.getElementById('pokedex-all').innerHTML = '';
    await load();
    if (pokes.length > 1) {
        await loadAndShowSavedPokes();
    }
    await showNextCountPokes();
    updateAmountPokesAndProgress();
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
    // Info: beginPokeNr = 1; count = 3; -> endPokeNr = 4;
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
    // return 'render done'
}


async function getNextCountPokes() {
    for (let i = beginPokeNr; i <= endPokeNr; i++) {
        await loadCurrentPoke(i);
        addToPokesLoaded();
    }
    // return 'get done';
}


async function sortPokesLoaded() {
    pokesLoaded.splice(0, 1);
    pokesLoaded.sort(function (a, b) { return a.pokeId - b.pokeId });
    // return 'sort done';
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
            }
        );
    }
    // return 'push done';
}


function updateParam() {
    beginPokeNr = pokes.length;
    endPokeNr = beginPokeNr + count;
    // return 'update done';
}


async function loadCurrentPoke(i) {
    let url = `https://pokeapi.co/api/v2/pokemon/${i}`;
    let response = await fetch(url);
    let responseAsJSON = await response.json();
    currentPoke = responseAsJSON;
    // console.log(currentPoke);
    return currentPoke;
}


async function loadCurrentSpecie(i) {
    let url = pokes[i]['pokeSpecie'][0];
    let response = await fetch(url);
    let responseAsJSON = await response.json();
    currentSpecie = responseAsJSON;
    // console.log(currentSpecie);
    return currentSpecie;
}


async function loadCurrentAbility(i) {
    let url = pokes[i]['pokeAbilityURL'][0];
    let response = await fetch(url);
    let responseAsJSON = await response.json();
    currentAbility = responseAsJSON;
    // console.log(currentAbility);
    return currentAbility;
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
    // return 'check done';
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
        }
    ];
    // return 'reset done'
}


function showCurrentPoke(currentPokeNr) {
    document.getElementById('pokedex' + currentPokeNr).style = 'transform: translateX(0%);';
    document.getElementById('pokedex' + nextPokeNr).style = 'transform: translateX(100%);';
    if (currentPokeNr == 1) {
        return;
    } else {
        document.getElementById('pokedex' + beforePokeNr).style = 'transform: translateX(-100%);';
        // return 'show done';
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
    pushToPokesLoaded(pokeId, pokeName, pokeNameGerman, pokeImg, pokeSlot1, pokeSlot2, pokeWeight, pokeHeight, pokeSpecie, pokeFlavors, pokeAbilities, pokeAbilityURL, pokeAbilityFlavors);
}


function pushToPokesLoaded(pokeId, pokeName, pokeNameGerman, pokeImg, pokeSlot1, pokeSlot2, pokeWeight, pokeHeight, pokeSpecie, pokeFlavors, pokeAbilities, pokeAbilityURL, pokeAbilityFlavors) {
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

        }
    )
}


// function noticePokeNrsOnLeft200(i) {
//     currentPokeNrLeft200 = i;
//     beforePokeNrLeft200 = currentPokeNrLeft200 - 1;
//     nextPokeNrLeft200 = currentPokeNrLeft200 + 1;
// }


// function updatePokeNrsWith(i) {
//     currentPokeNr = i;
//     beforePokeNr = currentPokeNr - 1;
//     nextPokeNr = currentPokeNr + 1;
// }


// function checkOutByX(i, currentPoke, beforePoke, nextPoke) {
//     if (beforePoke) {
//         document.getElementById('pokedex' + beforePoke).style = `transform: translateX(${i}%);`;
//     }
//     document.getElementById('pokedex' + currentPoke).style = `transform: translateX(${i}%);`;
//     document.getElementById('pokedex' + nextPoke).style = `transform: translateX(${i}%);`;
// }


// function checkOutRight200() {
//     if (beforePokeNr) {
//         document.getElementById('pokedex' + beforePokeNr).style = 'transform: translateX(200%);';
//     }
//     document.getElementById('pokedex' + currentPokeNr).style = 'transform: translateX(200%);';
//     document.getElementById('pokedex' + nextPokeNr).style = 'transform: translateX(200%);';
// }


// async function shiftBeforePokes(searchId) {
//     let position = -200;
//     let startNr = currentPokeNr;
//     let endNr = searchId;
//     for (let i = startNr; i <= endNr; i++) {
//         await shiftPokeToXByNr(i, position);
//     }
// }


// function shiftNextPokes(searchId) {
//     let position = +200;
//     let startNr = currentPokeNr;
//     let endNr = searchId;
//     for (let i = startNr; i >= endNr; i--) {
//         shiftPokeToXByNr(i, position);
//     }
// }


// async function shiftPokeToXByNr(pokeNr, position) {
//     document.getElementById('pokedex' + pokeNr).style = `transform: translateX(${position}%);`;
// }





// function checkOutRight200() {
//     if (beforePokeNr) {
//         document.getElementById('pokedex' + beforePokeNr).style = 'transform: translateX(200%);';
//     }
//     document.getElementById('pokedex' + currentPokeNr).style = 'transform: translateX(200%);';
//     document.getElementById('pokedex' + nextPokeNr).style = 'transform: translateX(200%);';
// }


// async function updatePokeCaseLeft() {
//     let promise = new Promise((resolve, reject) => {
//         resolve(pokeCaseLeft());
//     });
//     let result = await promise;
//     return result;
// }


// function addCurrentTransition() {
//     document.getElementById('pokedex' + currentPokeNr).classList.add(`transition${millisec}`);
//     if (beforePokeNr >= 1) {
//         document.getElementById('pokedex' + beforePokeNr).classList.add(`transition${millisec}`);
//     }
//     if (nextPokeNr < pokes.length) {
//         document.getElementById('pokedex' + nextPokeNr).classList.add(`transition${millisec}`);
//     }
// }