async function renderPokMini() {
    document.getElementById('pokedexMinis-all').innerHTML = '';
    document.getElementById('pokedexMinis-all').innerHTML = generateHTMLPokeMiniAll();
}

async function renderPokeMini(i) {
    let promises = [
        renderPokePlaces(i),
        renderPokeMiniNr(i),
        renderImage(i),
        renderBackground(i),
        renderGermanName(i),
        changeMiniToBlack(i),
    ]
    await Promise.all(promises);

}


function renderBackground(i) {
    let miniSlot1 = myPokesAsObject[i]['slot1'];
    let bgnType = 'bgn-type-' + miniSlot1;
    document.getElementById('miniPokeCard' + i).classList.add(`${bgnType}`);
}


function changeMiniToBlack(i) {
    let miniSlot1 = myPokesAsObject[i]['slot1'];
    if (miniSlot1 == 'electric' || miniSlot1 == 'ice') {
        document.getElementById('germanName' + i).classList.add(`color-black`);
        document.getElementById('pokeMini' + i).classList.add(`color-black`);
    }
}


function renderPokePlaces(i) {
    document.getElementById('miniPokes').innerHTML += generateHTMLPlaces(i);
}


function generateHTMLPlaces(i) {
    return `
        <div id="miniPokeCard${i}"class="mini-poke-card">
            <button onclick="showPokeCard(${i})">
                <div id="germanName${i}" style="color: white"></div>
                <div id="pokeMini${i}" style="color: white"></div>
                <div class="mini-poke-img-place" id="image${i}"></div>
                </button>
                </div>
                `
}


async function renderPokeMiniNr(i) {
    let formatedPokeMiniId = format3LeftHandZeros(i);
    document.getElementById('pokeMini' + i).innerHTML += generateHTMLpokeMiniId(formatedPokeMiniId);
}


async function renderImage(i) {
    let url = myPokesAsObject[i]['imgUrl'];
    document.getElementById('image' + i).innerHTML = generateHTMLImage(url);
}


async function renderGermanName(i) {
    let name = myPokesAsObject[i]['nameGerman'];
    document.getElementById('germanName' + i).innerHTML = generateHTMLGermanName(name);
}


function generateHTMLpokeMiniId(pokeMiniId) {
    return `
            <div># ${pokeMiniId}</div>
            `;
}


function generateHTMLImage(url) {
    return `
            <img src="${url}">
            `;
}


function generateHTMLGermanName(currentGermanName) {
    return `
            <div>${currentGermanName}</div>
            `;
}


function format3LeftHandZeros(value) {
    value = value.toString();
    let formatValue = value.padStart(4, '0');
    return formatValue;
}


async function renderPokeMiniNavigation(cardIdsPokeMini) {
    let pokeSlot1 = 'grass';
    let bgnSlotType = 'bgn-type-' + pokeSlot1;
    let bgnActiveType = 'bgn-slot-type-' + pokeSlot1;
    for (let k = 0; k < cardIdsPokeMini.length; k++) {
        document.getElementById('btn-card' + cardIdsPokeMini[k] + 1).classList.add(`${bgnSlotType}`);
    }
    document.getElementById('btn-card101').classList.remove(`${bgnSlotType}`);
    document.getElementById('btn-card101').classList.add(`${bgnActiveType}`);
}