function backToPokeMinis() {
    document.getElementById('pokedex-all').classList.add('display-none');
}

function showPokeCard(i) {
    document.getElementById('pokedex-all').classList.remove('display-none');
    showPokeBy(i, currentPokeNr);
}

async function renderPokeMinisAll() {
    document.getElementById('pokeMinis-all').innerHTML = '';
    generateHTMLPokeMinisAllHeader();
    document.getElementById('pokeMinis-all').innerHTML = generateHTMLPokeMinisAllHeader();
    generateHTMLPokeMini();
    for (let i = 0; i < pokes.length; i++) {
        document.getElementById('pokeMinis').innerHTML += generateHTMLPokeMini(i);  
    }
}

function generateHTMLPokeMinisAllHeader(){
    return `
    <h1>Pokedex</h1>
    <div id="pokeMinis" class="pokeMinis"></div>
    `;
}

function generateHTMLPokeMini(i){
    return `
    <h6>Pokedex-Mini ${i}</h6>
    <button onclick="showPokeCard(${i})">Zeige Karte</button>
    `;
}