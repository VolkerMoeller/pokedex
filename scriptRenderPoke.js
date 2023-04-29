function renderAmountLaodedPokes() {
    document.getElementById('amount-pokes-loaded' + currentPokeNr).innerHTML = '';
    document.getElementById('amount-pokes-loaded' + currentPokeNr).innerHTML = generateHTMLAmountLoadedPokes();
}


function renderPoke(i) {
    document.getElementById('pokedex-all').innerHTML += generateHTMLPokedex(i);
    renderPokeTop(i);
    renderPokeBottom(i);
    stylePokeBgnTop(i);
    renderPokeBottomNavigation(i);
}


function renderPokeTop(i) {
    let pokeName = pokes[i]['pokeName'];
    document.getElementById('pokedex-name' + i).innerHTML += `<h1>${pokeName}</h1>`;
    let pokeId = pokes[i]['pokeId'];
    let formatPokeId = format3LeftHandZeros(pokeId);
    document.getElementById('pokedex-id' + i).innerHTML += `<div># ${formatPokeId}</div>`;
    let pokeSlot1 = pokes[i]['pokeSlot1'];
    let bgnSlotType = 'bgn-slot-type-' + pokeSlot1;
    document.getElementById('pokedex-slots' + i).innerHTML += `<div id="base-type${i}" class="slot ${bgnSlotType}">${pokeSlot1}</div>`;
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
    await loadCurrentSpecie(i);
    renderPokeCardAbout(i);
}


function stylePokeBgnTop(i) {
    let pokeType = document.getElementById('base-type' + i).innerHTML;
    setBgnByType(pokeType, i);
}


async function renderPokeCardAbout(i) {
    let pokeGenera = currentSpecie['genera'][4]['genus'];
    document.getElementById('card1' + i).innerHTML += `<div><b>Kategorie: </b>${pokeGenera}</div>`;
    let pokeFlavor = currentSpecie['flavor_text_entries'];
    await searchGermanText(pokeFlavor, i);
    let pokeFlavor1st = pokes[i]['pokeFlavors'][1];
    document.getElementById('card1' + i).innerHTML += `<div><b>Beschreibung: </b>${pokeFlavor1st}</div>`;
    let pokeWeight = pokes[i]['pokeWeight'];
    document.getElementById('card1' + i).innerHTML += `<div><b>Gewicht: </b>${pokeWeight} Poke-Einheiten</div>`;
}


async function searchGermanText(pokeFlavor, i) {
    for (let j = 0; j < pokeFlavor.length; j++) {
        let language = pokeFlavor[j]['language']['name'];
        pushFlavor(language, i, j, pokeFlavor);
    }
}

function pushFlavor(language, i, j, pokeFlavor) {
    if (language == 'de') {
        let flavorText = pokeFlavor[j]['flavor_text'];
        pokes[i]['pokeFlavors'].push(flavorText);
    }
}