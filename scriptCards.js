function showCurrentCardById(i, j) {
    setAllCardsToDefault();
    setCurrentCardToActiv(i);
    setCurrentSlideOnActiv(j);
}


function setAllCardsToDefault() {
    for (let j = 1; j <= 4; j++) {
        let cardToHide = 'card' + j + currentPokeNr;
        document.getElementById(cardToHide).classList.add('display-none');
    }
}


function setCurrentCardToActiv(i) {
    let cardToShow = i;
    document.getElementById(cardToShow).classList.remove('display-none');
}


function setCurrentSlideOnActiv(j) {
    setAllSliderToDefault();
    let pokeSlot1 = pokes[currentPokeNr]['pokeSlot1'][0];
    let bgnActiveType = 'bgn-slot-type-' + pokeSlot1;
    let bgnDefaultType = 'bgn-type-' + pokeSlot1;
    let currentSlide = j;
    document.getElementById(currentSlide).classList.remove(`${bgnDefaultType}`);
    document.getElementById(currentSlide).classList.add(`${bgnActiveType}`);
}


function setAllSliderToDefault() {
    let pokeSlot1 = pokes[currentPokeNr]['pokeSlot1'][0];
    let bgnActiveType = 'bgn-slot-type-' + pokeSlot1;
    let bgnDefaultType = 'bgn-type-' + pokeSlot1;
    let bgnHoverType = 'bgn-hover-type-' + pokeSlot1;
    for (let i = 1; i <= 4; i++) {
        let sliderId = 'btn-card' + i + currentPokeNr;
        document.getElementById(sliderId).classList.remove(`${bgnActiveType}`);
        document.getElementById(sliderId).classList.remove(`${bgnHoverType}`);
        document.getElementById(sliderId).classList.add(`${bgnDefaultType}`);
    }
}


function hoverNavigationOver(j, i) {
    let pokeSlot1 = pokes[i]['pokeSlot1'][0];
    let bgnHoverType = 'bgn-hover-type-' + pokeSlot1;
    document.getElementById('btn-card' + j + i).classList.add(`${bgnHoverType}`);
}


function hoverNavigationOut(j, i) {
    let pokeSlot1 = pokes[i]['pokeSlot1'][0];
    let bgnHoverType = 'bgn-hover-type-' + pokeSlot1;
    document.getElementById('btn-card' + j + i).classList.remove(`${bgnHoverType}`);
}