function showCurrentCardById(i, j, cards) {
    setAllCardsToDefault(j, cards);
    setCurrentCardToActiv(i);
    setCurrentSlideOnActiv(i, j, cards);
}


function setAllCardsToDefault(j, cards) {
    for (let k = 0; k < cards.length; k++) {
        let cardToHide = 'card' + cards[k] + j;
        document.getElementById(cardToHide).classList.add('display-none');
    }
}


function setCurrentCardToActiv(i) {
    let cardToShow = i;
    document.getElementById(cardToShow).classList.remove('display-none');
}


function setCurrentSlideOnActiv(i,j, cards) {
    setAllSliderToDefault(j,cards);
    let slot1 = myPokesAsObject[currentPokeNr]['slot1'];
    let bgnActiveType = 'bgn-slot-type-' + slot1;
    let bgnDefaultType = 'bgn-type-' + slot1;
    let currentSlide = 'btn-' + i;
    document.getElementById(currentSlide).classList.remove(`${bgnDefaultType}`);
    document.getElementById(currentSlide).classList.add(`${bgnActiveType}`);
}


function setAllSliderToDefault(j, cards) {
    let slot1 = myPokesAsObject[currentPokeNr]['slot1'];
    let bgnActiveType = 'bgn-slot-type-' + slot1;
    let bgnDefaultType = 'bgn-type-' + slot1;
    let bgnHoverType = 'bgn-hover-type-' + slot1;
    for (let i = 0; i < cards.length; i++) {
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