function updateProgress() {
    let progressWidth = pokes.length / amountPokes * 100;
    document.getElementById('progress' + currentPokeNr).style = `width: ${progressWidth}%`;
}