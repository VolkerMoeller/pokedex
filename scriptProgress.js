function updateAmountPokesAndProgress() {
    renderAmountLoadedPokes();
    updateProgress();
}


function renderAmountLoadedPokes() {
    document.getElementById('amount-pokes-loaded' + currentPokeNr).innerHTML = '';
    document.getElementById('amount-pokes-loaded' + currentPokeNr).innerHTML = generateHTMLAmountLoadedPokes();
}


function updateProgress() {
    let progressWidth = myPokesAsObject.length / amountPokes * 100;
    document.getElementById('progress' + currentPokeNr).style = `width: ${progressWidth}%`;
}


function generateHTMLAmountLoadedPokes() {
    let amountLoadedPokes = myPokesAsObject.length - 1;
    return amountLoadedPokes + ' von ' + amountPokes + ' geladen';
}