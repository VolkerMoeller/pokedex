function updateAmountPokesAndProgress() {
    renderAmountLoadedPokes();
    updateProgress();
}

function renderAmountLoadedPokes() {
    document.getElementById('amount-pokes-loaded' + currentPokeNr).innerHTML = '';
    document.getElementById('amount-pokes-loaded' + currentPokeNr).innerHTML = generateHTMLAmountLoadedPokes();
}


function updateProgress() {
    let progressWidth = pokes.length / amountPokes * 100;
    document.getElementById('progress' + currentPokeNr).style = `width: ${progressWidth}%`;
}


function generateHTMLAmountLoadedPokes() {
    return 'Es wurden ' + amountLoadedPokes + ' von 1010 geladen';
}