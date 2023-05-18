async function renderPokeCardAbout(i) {
    renderPokeGenera(i);
    renderPokeGermanName(i);
    renderPokeFlavor(i);
    renderPokeWeightAndHeight(i);
    renderPokeAbility(i);
}


async function renderPokeAbility(i) {
    let pokeAbility = myPokesAsObject['abilityGerman'];
    document.getElementById('card1' + i).innerHTML += `<div><b>Fähigkeit: </b>${pokeAbility}:</div>`;
    let pokeFlavor2nd = myPokesAsObject['abilityFlavor'];
    document.getElementById('card1' + i).innerHTML += `<div>${pokeFlavor2nd}</div>`;
};


function renderPokeWeightAndHeight(i) {
    let pokeWeight = myPokesAsObject['weight'];
    document.getElementById('card1' + i).innerHTML += `<div><b>Gewicht: </b>${pokeWeight} Poke-Einheiten</div>`;
    let pokeHeight = myPokesAsObject['height'];
    document.getElementById('card1' + i).innerHTML += `<div><b>Höhe: </b>${pokeHeight} Poke-Einheiten</div>`;
};


async function renderPokeFlavor(i) {
    let pokeFlavor1st = myPokesAsObject['generaFlavor'];
    document.getElementById('card1' + i).innerHTML += `<div>${pokeFlavor1st}</div>`;
};


async function renderPokeGermanName(i) {
    let pokeNameGerman = myPokesAsObject['nameGerman'];
    document.getElementById('pokedex-name' + i).innerHTML += `<h1>${pokeNameGerman}</h1>`;
};


function renderPokeGenera(i) {
    let pokeGenera = myPokesAsObject['generaGerman'];
    document.getElementById('card1' + i).innerHTML += `<div><b>Kategorie: </b>${pokeGenera}</div>`;
}


// async function searchGermanText(pokeFlavor, i) {
//     for (let j = 0; j < pokeFlavor.length; j++) {
//         let language = pokeFlavor[j]['language']['name'];
//         await pushFlavor(language, i, j, pokeFlavor);
//     }
// }


// async function searchGermanName(pokeNamesGerman, i) {
//     for (let j = 0; j < pokeNamesGerman.length; j++) {
//         let language = pokeNamesGerman[j]['language']['name'];
//         await pushGermanName(language, i, j, pokeNamesGerman);
//     }
// }


// async function pushGermanName(language, i, j, pokeNamesGerman) {
//     if (language == 'de') {
//         let germanName = pokeNamesGerman[j]['name'];
//         pokes[i]['pokeNameGerman'] = [];
//         pokes[i]['pokeNameGerman'].push(germanName);
//     }
// }


// async function pushFlavor(language, i, j, pokeFlavor) {
//     if (language == 'de') {
//         let flavorText = pokeFlavor[j]['flavor_text'];
//         pokes[i]['pokeFlavors'][0] = [];
//         pokes[i]['pokeFlavors'][0].push(flavorText);
//     }
//     save();
// }


// async function searchGermanTextAbilityFlavor(pokeAbilityFlavor, i) {
//     for (let j = 0; j < pokeAbilityFlavor.length; j++) {
//         let language = pokeAbilityFlavor[j]['language']['name'];
//         pushAbilityFlavor(language, i, j, pokeAbilityFlavor);
//     }
// }


// function pushAbilityFlavor(language, i, j, pokeAbilityFlavor) {
//     if (language == 'de') {
//         let flavorText = pokeAbilityFlavor[j]['flavor_text'];
//         pokes[i]['pokeAbilityFlavors'] = [];
//         pokes[i]['pokeAbilityFlavors'].push(flavorText);
//     }
//     save();
// }