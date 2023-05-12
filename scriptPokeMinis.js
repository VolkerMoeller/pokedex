function backToPokeMinis() {
    document.getElementById('pokedex-all').classList.add('display-none');
    document.getElementById('overlay').classList.add('display-none');
}

function showPokeCard(i) {
    document.getElementById('pokedex-all').classList.remove('display-none');
    document.getElementById('overlay').classList.remove('display-none');
    showPokeBy(i, currentPokeNr);
}


async function initPokeMini() {
    if (!functionRunning) {
        functionRunning = true;
        renderPokeMiniContent();
        renderPokeMiniHeader();
        getAndRenderPokeMini();
        functionRunning = false;
    }
}


function renderPokeMiniContent() {
    document.getElementById('pokeMinis-all').innerHTML += generateHTMLPokeMiniContent();
}


function generateHTMLPokeMiniContent() {
    return `
        <div id="miniHeader" class="miniHeader">
        </div>  
        <div id="miniPokes" class="miniPokes">
        </div>  
    `;
}

function renderPokeMiniHeader() {
    document.getElementById('miniHeader').innerHTML = generateHTMLPokeMiniHeader();
}


function generateHTMLPokeMiniHeader() {
    return `
        <h1>Pokemöller</h1> 
    `;
}


async function getAndRenderPokeMini() {
    for (let j = 1; j <= countX; j++) {
        let promises1st = [renderPokePlaces(nextPokeMini), getCurrentPoke(nextPokeMini)];
        await Promise.all(promises1st);
        let promises2nd = [takepokeMiniId(nextPokeMini), renderPokeMini(nextPokeMini)];
        await Promise.all(promises2nd);
        await getAndRenderImage(nextPokeMini);
        await getAndRenderGermanName(nextPokeMini);
        nextPokeMini++;
    }
}


async function getAndRenderImage(nextPokeMini) {
    takeCurrentImageUrl();
    renderCurrentImage(nextPokeMini, currentImageUrl);
    renderBackground(nextPokeMini);
}


function renderBackground(nextPokeMini) {
    takeCurrentSlot1();
    let bgnSlotType = 'bgn-slot-type-' + miniSlot1;
    let bgnType = 'bgn-type-' + miniSlot1;
    document.getElementById('miniPokeCard' + nextPokeMini).classList.add(`${bgnType}`);
}

function takeCurrentSlot1() {
    miniSlot1 = rspCurrentPokeAsJSON['types'][0]['type']['name'];
    return miniSlot1;
}


async function getAndRenderGermanName(nextPokeMini) {
    takeCurrentNamesUrl();
    await getCurrentNames(currentNamesUrl);
    takeCurrentGermanName()
    renderCurrentGermanName(nextPokeMini, currentGermanName);
}


async function getCurrentPoke(nextPokeMini) {
    let url = `https://pokeapi.co/api/v2/pokemon/${nextPokeMini}/`;
    let response = await fetch(url);
    let responseAsJSON = await response.json();
    rspCurrentPokeAsJSON = responseAsJSON;
    return rspCurrentPokeAsJSON;
}


async function getCurrentNames(url) {
    let response = await fetch(url);
    let responseAsJSON = await response.json();
    rspCurrentNamesAsJSON = responseAsJSON;
    return rspCurrentNamesAsJSON;
}


async function takeCurrentImageUrl() {
    currentImageUrl = rspCurrentPokeAsJSON['sprites']['other']['home']['front_default'];
    return currentImageUrl;
}


async function takeCurrentNamesUrl() {
    currentNamesUrl = rspCurrentPokeAsJSON['species']['url'];
    return currentNamesUrl;
}


async function takeCurrentGermanName() {
    currentNames = rspCurrentNamesAsJSON['names'];
    await searchGermanNameMiniPoke(currentNames);
}


async function searchGermanNameMiniPoke(currentGermanNames) {
    for (let j = 0; j < currentGermanNames.length; j++) {
        let language = currentGermanNames[j]['language']['name'];
        checkIfGerman(language, j);
    }
}


function checkIfGerman(language, j) {
    if (language == 'de') {
        currentGermanName = currentNames[j]['name'];
        return currentGermanName;
    } else {
        return;
    }
}

function takepokeMiniId(nextPokeMini) {
    pokeMiniId = rspCurrentPokeAsJSON['id'];
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


async function renderPokeMini(nextPokeMini) {
    let formatedPokeMiniId = format3LeftHandZeros(nextPokeMini);
    document.getElementById('pokeMini' + nextPokeMini).innerHTML += generateHTMLpokeMiniId(formatedPokeMiniId);
}


async function renderCurrentImage(nextPokeMini, url) {
    document.getElementById('image' + nextPokeMini).innerHTML = generateHTMLImage(url);
}


async function renderCurrentGermanName(nextPokeMini, currentGermanName) {
    document.getElementById('germanName' + nextPokeMini).innerHTML = generateHTMLGermanName(currentGermanName);
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
