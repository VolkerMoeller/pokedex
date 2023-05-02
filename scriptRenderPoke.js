function renderPoke(i) {
    document.getElementById('pokedex-all').innerHTML += generateHTMLPokedex(i);
    renderPokeTop(i);
    renderPokeBottom(i);
    stylePokeBgnTop(i);
    renderPokeBottomNavigation(i);
    amountRenderdPokes = amountRenderdPokes + 1;
}


function renderPokeTop(i) {
    let pokeId = pokes[i]['pokeId'];
    let formatPokeId = format3LeftHandZeros(pokeId);
    document.getElementById('pokedex-id' + i).innerHTML += `<div># ${formatPokeId}</div>`;
    let pokeSlot1 = pokes[i]['pokeSlot1'];
    let bgnSlotType = 'bgn-slot-type-' + pokeSlot1;
    let bgnType = 'bgn-type-' + pokeSlot1;
    document.getElementById('pokedex-slots' + i).innerHTML += `<div id="base-type${i}" class="slot ${bgnSlotType}">${pokeSlot1}</div>`;
    document.getElementById('btn-fill0' + i).classList.add(`${bgnType}`);
    document.getElementById('btn-fill1' + i).classList.add(`${bgnType}`);
    let pokeImg = pokes[i]['pokeImg'];
    document.getElementById('pokedex-top' + i).innerHTML += `<div id="pokeImg"><img src="${pokeImg}"></div>`;
    if (pokes[i]['pokeSlot2'] == 'none') {
    } else {
        let pokeSlot2 = pokes[i]['pokeSlot2'];
        let bgnSlotType = 'bgn-slot-type-' + pokeSlot2;
        document.getElementById('pokedex-slots' + i).innerHTML += `<div class="slot ${bgnSlotType}">${pokeSlot2}</div>`;
    }
    if (pokeSlot1 == 'electric') {
        document.getElementById('pokedex-name' + i).classList.add('color-black');
        document.getElementById('pokedex-id' + i).classList.add('color-black');
        document.getElementById('pokedex-slots' + i).classList.add('color-black');
        document.getElementById('amount-pokes-loaded' + i).classList.add('color-black');
        document.getElementById('searchByNameLine' + i).classList.add('color-black');
        for (let j = 1; j <= 4; j++) {
            document.getElementById('btn-card' + j + i).classList.add('color-black');
        }
    }
    if (pokeSlot1 == 'ice') {
        document.getElementById('pokedex-name' + i).classList.add('color-black');
        document.getElementById('pokedex-id' + i).classList.add('color-black');
        document.getElementById('pokedex-slots' + i).classList.add('color-black');
        document.getElementById('amount-pokes-loaded' + i).classList.add('color-black');
        document.getElementById('searchByNameLine' + i).classList.add('color-black');
        for (let j = 1; j <= 4; j++) {
            document.getElementById('btn-card' + j + i).classList.add('color-black');
        }
    }
}


function renderPokeBottomNavigation(i) {
    let pokeSlot1 = pokes[i]['pokeSlot1'][0];
    let bgnSlotType = 'bgn-type-' + pokeSlot1;
    let bgnActiveType = 'bgn-slot-type-' + pokeSlot1;
    for (let k = 1; k <= 4; k++) {
        document.getElementById('btn-card' + k + i).classList.add(`${bgnSlotType}`);
    }
    document.getElementById('btn-card' + 1 + i).classList.remove(`${bgnSlotType}`);
    document.getElementById('btn-card' + 1 + i).classList.add(`${bgnActiveType}`);
}


async function renderPokeBottom(i) {
    renderPokeCardAbout(i);
}


function stylePokeBgnTop(i) {
    let pokeType = document.getElementById('base-type' + i).innerHTML;
    setBgnByType(pokeType, i);
}


function format3LeftHandZeros(value) {
    value = value.toString();
    let formatValue = value.padStart(4, '0');
    return formatValue;
}

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