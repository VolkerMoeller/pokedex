function showCurrentCardById(i, j, cards) {
    setAllCardsToDefault(cards);
    setCurrentCardToActiv(i);
    setCurrentSlideOnActiv(j, cards);
}


function setAllCardsToDefault(cards) {
    for (let j = 0; j < cards.length; j++) {
        let k = j + 1;
        let cardToHide = 'card' + cards[j] + k;
        document.getElementById(cardToHide).classList.add('display-none');
    }
}


function setCurrentCardToActiv(i) {
    let cardToShow = i;
    document.getElementById(cardToShow).classList.remove('display-none');
}


function setCurrentSlideOnActiv(j, cards) {
    setAllSliderToDefault(cards);
    let slot1 = myPokesAsObject[currentPokeNr]['slot1'];
    let bgnActiveType = 'bgn-slot-type-' + slot1;
    let bgnDefaultType = 'bgn-type-' + slot1;
    let currentSlide = j;
    document.getElementById(currentSlide).classList.remove(`${bgnDefaultType}`);
    document.getElementById(currentSlide).classList.add(`${bgnActiveType}`);
}


function setAllSliderToDefault(cards) {
    let slot1 = myPokesAsObject[currentPokeNr]['slot1'];
    let bgnActiveType = 'bgn-slot-type-' + slot1;
    let bgnDefaultType = 'bgn-type-' + slot1;
    let bgnHoverType = 'bgn-hover-type-' + slot1;
    for (let i = 0; i < cards.length; i++) {
        let j = i + 1;
        let sliderId = 'btn-card' + cards[i] + j;
        document.getElementById(sliderId).classList.remove(`${bgnActiveType}`);
        document.getElementById(sliderId).classList.remove(`${bgnHoverType}`);
        document.getElementById(sliderId).classList.add(`${bgnDefaultType}`);
    }
}


function hoverNavigationOver(j, i) {
    let slot1 = myPokesAsObject[i]['slot1'];
    let bgnHoverType = 'bgn-hover-type-' + slot1;
    document.getElementById('btn-card' + j + i).classList.add(`${bgnHoverType}`);
}


function hoverNavigationOut(j, i) {
    let slot1 = myPokesAsObject[i]['slot1'];
    let bgnHoverType = 'bgn-hover-type-' + slot1;
    document.getElementById('btn-card' + j + i).classList.remove(`${bgnHoverType}`);
}

function hoverNavigationOverStandard(j, i) {
    let slot1 = myPokesAsObject[1]['slot1'];
    let bgnHoverType = 'bgn-hover-type-' + slot1;
    document.getElementById('btn-card' + j + i).classList.add(`${bgnHoverType}`);
}


function hoverNavigationOutStandard(j, i) {
    let slot1 = myPokesAsObject[1]['slot1'];
    let bgnHoverType = 'bgn-hover-type-' + slot1;
    document.getElementById('btn-card' + j + i).classList.remove(`${bgnHoverType}`);
}