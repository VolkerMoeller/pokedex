async function renderPokeCardAbout(i) {
    await loadCurrentSpecie(i);
    let pokeGenera = currentSpecie['genera'][4]['genus'];
    document.getElementById('card1' + i).innerHTML += `<div><b>Kategorie: </b>${pokeGenera}</div>`;
    // and German-Name
    let pokeNamesGerman = currentSpecie['names'];
    await searchGermanName(pokeNamesGerman, i);
    let pokeNameGerman = pokes[i]['pokeNameGerman'][1];
    document.getElementById('pokedex-name' + i).innerHTML += `<h1>${pokeNameGerman}</h1>`;

    let pokeFlavor = currentSpecie['flavor_text_entries'];
    await searchGermanText(pokeFlavor, i);
    let pokeFlavor1st = pokes[i]['pokeFlavors'][1];
    document.getElementById('card1' + i).innerHTML += `<div>${pokeFlavor1st}</div>`;
    let pokeWeight = pokes[i]['pokeWeight'];
    document.getElementById('card1' + i).innerHTML += `<div><b>Gewicht: </b>${pokeWeight} Poke-Einheiten</div>`;
    let pokeHeight = pokes[i]['pokeHeight'];
    document.getElementById('card1' + i).innerHTML += `<div><b>Höhe: </b>${pokeHeight} Poke-Einheiten</div>`;

    await loadCurrentAbility(i);
    let pokeAbility = currentAbility['names'][4]['name'];
    document.getElementById('card1' + i).innerHTML += `<div><b>Fähigkeit: </b>${pokeAbility}</div>`;
    let pokeAbilityFlavor = currentAbility['flavor_text_entries'];
    searchGermanTextAbilityFlavor(pokeAbilityFlavor, i);
    let pokeFlavor2nd = pokes[i]['pokeAbilityFlavors'][1];
    document.getElementById('card1' + i).innerHTML += `<div>${pokeFlavor2nd}</div>`;
}


async function searchGermanText(pokeFlavor, i) {
    for (let j = 0; j < pokeFlavor.length; j++) {
        let language = pokeFlavor[j]['language']['name'];
        pushFlavor(language, i, j, pokeFlavor);
    }
}


async function searchGermanName(pokeNamesGerman, i) {
    for (let j = 0; j < pokeNamesGerman.length; j++) {
        let language = pokeNamesGerman[j]['language']['name'];
        pushGermanName(language, i, j, pokeNamesGerman);
    }
}


function pushFlavor(language, i, j, pokeFlavor) {
    if (language == 'de') {
        let flavorText = pokeFlavor[j]['flavor_text'];
        pokes[i]['pokeFlavors'].push(flavorText);
    }
}


function pushGermanName(language, i, j, pokeNamesGerman) {
    if (language == 'de') {
        let germanName = pokeNamesGerman[j]['name'];
        pokes[i]['pokeNameGerman'].push(germanName);
    }
}

async function searchGermanTextAbilityFlavor(pokeAbilityFlavor, i) {
    for (let j = 0; j < pokeAbilityFlavor.length; j++) {
        let language = pokeAbilityFlavor[j]['language']['name'];
        pushAbilityFlavor(language, i, j, pokeAbilityFlavor);
    }
}


function pushAbilityFlavor(language, i, j, pokeAbilityFlavor) {
    if (language == 'de') {
        let flavorText = pokeAbilityFlavor[j]['flavor_text'];
        pokes[i]['pokeAbilityFlavors'].push(flavorText);
    }
}