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
    renderPokeCardBaseStats(i);
    renderPokeCardMoves(i);
    renderPokeCardEvolution(i);
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