function setFavorite(i) {
    let hidden = document.getElementById(`fill0${i}`).classList.contains('display-none');
    if (hidden == true) {
        document.getElementById(`fill0${i}`).classList.remove('display-none');
        document.getElementById(`fill1${i}`).classList.add('display-none');
    } else {
        document.getElementById(`fill0${i}`).classList.add('display-none');
        document.getElementById(`fill1${i}`).classList.remove('display-none');
    }
}


function addFavorite(i) {
    pokesFavorites.push(i);
    console.log(pokesFavorites);
}

function removeFavorite(i) {
    console.log('removeFavorites');
}