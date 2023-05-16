function backToPokeMinis() {
    initPokeMini();
    document.getElementById('pokedexMinis-all').classList.remove('display-none');
    document.getElementById('pokedex-all').classList.add('display-none');
    document.getElementById('overlay').classList.add('display-none');
}


function showPokeCard(i) {
    document.getElementById('pokedex-all').classList.remove('display-none');
    document.getElementById('overlay').classList.remove('display-none');
    showPokeBy(i, currentPokeNr);
    topFunction();
}


function renderPokeMini(i) {
    if (!functionRunning) {
        functionRunning = true;
        renderPokePlaces(i);
        renderPokeMiniNr(i);
        renderImage(i);
        renderBackground(i);
        renderGermanName(i);
        changeMiniToBlack(i);
    }
    functionRunning = false;
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