function savePokesToPokesSaved() {
    let pokesText = JSON.stringify(pokes);
    localStorage.setItem('pokesSaved', pokesText);
}


function savePokesSavedToPokes() {
    let pokesText = JSON.stringify(pokesSaved);
    localStorage.setItem('pokes', pokesText);
}


function save() {
    let pokesText = JSON.stringify(pokes);
    localStorage.setItem('pokes', pokesText);
}


async function load() {
    let pokesAsText = localStorage.getItem('pokes');
    if (pokesAsText) {
        pokes = JSON.parse(pokesAsText);
    }
}


function saveFavorites() {
    let pokesFavoritesAsText = JSON.stringify(pokesFavorites);
    localStorage.setItem('pokesFavorites', pokesFavoritesAsText);
}


async function loadFavorites() {
    let pokesFavoritesAsText = localStorage.getItem('pokesFavorites');
    if (pokesFavoritesAsText) {
        pokes = JSON.parse(pokesFavoritesAsText);
    }
}