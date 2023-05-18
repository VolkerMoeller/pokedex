function backToPokeMinis() {
    // initPokeMini();
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