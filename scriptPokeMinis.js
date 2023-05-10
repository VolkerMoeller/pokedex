let currentImageUrl = '';

function backToPokeMinis() {
    document.getElementById('pokedex-all').classList.add('display-none');
    document.getElementById('overlay').classList.add('display-none');
}

function showPokeCard(i) {
    document.getElementById('pokedex-all').classList.remove('display-none');
    document.getElementById('overlay').classList.remove('display-none');
    showPokeBy(i, currentPokeNr);
}

async function renderPokeMinisAll() {
    document.getElementById('pokeMinis-all').innerHTML = '';
    generateHTMLPokeMinisAllHeader();
    document.getElementById('pokeMinis-all').innerHTML = generateHTMLPokeMinisAllHeader();
    for (let i = 1; i < 4; i++) {
        renderPokeMini(i);
        await loadCurrentPoke(i);
        getAndRenderImage(i);
        // let pokeImg = pokes[i]['pokeImg'];
        // let pokeName = pokes[i]['pokeNameGerman'][1];
    }
}


async function renderPokeMini(i) {
    document.getElementById('pokeMinis').innerHTML += generateHTMLPokeMini(i);

}

async function getAndRenderImage(i) {
    takeCurrentImageUrl();
    renderCurrentImage(i, currentImageUrl);
}


async function takeCurrentImageUrl() {
    currentImageUrl = currentPoke['sprites']['other']['home']['front_default'];
    return currentImageUrl;
}


async function renderCurrentImage(i, url) {
    document.getElementById('miniImage' + i).innerHTML = generateHTMLImage(url);
}


function generateHTMLImage(url) {
    return  /*html*/`
    <img src="${url}">
    `;
}


function generateHTMLPokeMinisAllHeader() {
    return /*html*/`
        <h1>Pokedex</h1>
        <div id="pokeMinis" class="pokeMinis"></div>
    `;
}


function generateHTMLPokeMini(i) {
    return /*html*/`
        <div id="pokeMini${i}" class="pokeMini">
            <button onclick="showPokeCard(${i})">
                <div id="miniImage${i}" class="pokeMiniImg">
                </div>  
            </button>
        </div>
    `;
}
