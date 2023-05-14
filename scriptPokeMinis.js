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


async function initPokeMini() {
    // if (pokes) {
    //     let end = pokes.length -1;
    //     countX = end;
    // };
    await renderPokeMini();
    // countX = 4;
}

async function renderPokeMini() {
    if (!functionRunning) {
        functionRunning = true;
        await getAndRenderPokeMini();
        functionRunning = false;
    }
}

async function getAndRenderPokeMini() {
    document.getElementById('miniPokes').innerHTML = '';
    if (!functionRunning2) {
        functionRunning2 = true;
        for (let j = 1; j <= pokes.length - 1; j++) {
            let promises1st = [renderPokePlaces(j)];
            await Promise.all(promises1st);
            let promises2nd = [takepokeMiniId(j), renderPokeMiniNr(j)];
            await Promise.all(promises2nd);
            await getAndRenderImage(j);
            await getAndRenderGermanName(j);
            // nextPokeMini++;
        }
    }
    functionRunning2 = false;
}


async function getAndRenderImage(nextPokeMini) {
    renderCurrentImage(nextPokeMini);
    renderBackground(nextPokeMini);
}


function renderBackground(nextPokeMini) {
    let miniSlot1 = pokes[nextPokeMini]['pokeSlot1'];
    let bgnSlotType = 'bgn-slot-type-' + miniSlot1;
    let bgnType = 'bgn-type-' + miniSlot1;
    document.getElementById('miniPokeCard' + nextPokeMini).classList.add(`${bgnType}`);
}

function takeCurrentSlot1() {
    miniSlot1 = rspCurrentPokeAsJSON['types'][0]['type']['name'];
    return miniSlot1;
}


async function getAndRenderGermanName(nextPokeMini) {
    renderCurrentGermanName(nextPokeMini);
}


function takepokeMiniId(nextPokeMini) {
    pokeMiniId = pokes['pokeId'];
    return pokeMiniId;
}


function renderPokePlaces(nextPokeMini) {
    document.getElementById('miniPokes').innerHTML += generateHTMLPlaces(nextPokeMini);
}


function generateHTMLPlaces(nextPokeMini) {
    return `
        <div id="miniPokeCard${nextPokeMini}"class="mini-poke-card">
            <button onclick="showPokeCard(${nextPokeMini})">
                <div id="germanName${nextPokeMini}"></div>
                <div id="pokeMini${nextPokeMini}"></div>
                <div class="mini-poke-img-place" id="image${nextPokeMini}"></div>
                </button>
                </div>
                `
}


async function renderPokeMiniNr(nextPokeMini) {
    let formatedPokeMiniId = format3LeftHandZeros(nextPokeMini);
    document.getElementById('pokeMini' + nextPokeMini).innerHTML += generateHTMLpokeMiniId(formatedPokeMiniId);
}


async function renderCurrentImage(nextPokeMini) {
    let url = pokes[nextPokeMini]['pokeImg'];
    document.getElementById('image' + nextPokeMini).innerHTML = generateHTMLImage(url);
}


async function renderCurrentGermanName(nextPokeMini) {
    let name = pokes[nextPokeMini]['pokeNameGerman'][0];
    document.getElementById('germanName' + nextPokeMini).innerHTML = generateHTMLGermanName(name);
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


// function renderFavorite(){
//     if ()
// }
