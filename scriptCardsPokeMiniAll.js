function showCurrentCardPokeMiniAllById(i, j, cards) {
    setAllCardsToDefault(j, cards);
    setCurrentCardToActiv(i);
    setCurrentSlideOnActivPokeMiniAll(i, j, cards);
}


function setCurrentSlideOnActivPokeMiniAll(i, j, cards) {
    setAllSliderToDefaultPokeMiniAll(j, cards);
    let slot1 = myPokesAsObject[1]['slot1'];
    let bgnActiveType = 'bgn-type-' + slot1;
    let bgnDefaultType = 'bgn-slot-type-' + slot1;
    let currentSlide = 'btn-' + i;
    document.getElementById(currentSlide).classList.remove(`${bgnDefaultType}`);
    document.getElementById(currentSlide).classList.add(`${bgnActiveType}`);
}


function setAllSliderToDefaultPokeMiniAll(j, cards) {
    let slot1 = myPokesAsObject[1]['slot1'];
    let bgnActiveType = 'bgn-type-' + slot1;
    let bgnDefaultType = 'bgn-slot-type-' + slot1;
    let bgnHoverType = 'bgn-hover-type-' + slot1;
    for (let i = 0; i < cards.length; i++) {
        let sliderId = 'btn-card' + cards[i] + j;
        document.getElementById(sliderId).classList.remove(`${bgnActiveType}`);
        document.getElementById(sliderId).classList.remove(`${bgnHoverType}`);
        document.getElementById(sliderId).classList.add(`${bgnDefaultType}`);
    }
}