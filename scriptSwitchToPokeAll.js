function backToPokeMinis() {
    document.getElementById('pokedexMinis-all').classList.remove('display-none');
    document.getElementById('pokedex-all').classList.add('display-none');
    document.getElementById('overlay').classList.add('display-none');
    runFunctionOnScrollLoading();
}


function showPokeCard(i) {
    document.getElementById('pokedex-all').classList.remove('display-none');
    document.getElementById('overlay').classList.remove('display-none');
    stopFunctionOnScrollLoading() 
    showPokeBy(i, currentPokeNr);
    topFunction();
}


function stopFunctionOnScrollLoading() {
    onScrollLoading = false;
}

function runFunctionOnScrollLoading() {
    onScrollLoading = true;
}