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
    for (let i = 0; i < pokes.length; i++) {
        let pokeImg = pokes[i]['pokeImg'];
        let pokeName = pokes[i]['pokeNameGerman'][1];
        document.getElementById('pokeMinis').innerHTML += generateHTMLPokeMini(i, pokeImg, pokeName);
    }
}
