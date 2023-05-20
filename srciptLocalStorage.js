async function save() {
    let pokesText = JSON.stringify(myPokesAsObject);
    localStorage.setItem('pokes', pokesText);
}


async function load() {
    let pokesAsText = localStorage.getItem('pokes');
    if (pokesAsText) {
        myPokesAsObject = JSON.parse(pokesAsText);
    }
}


function saveFavorites() {
    let pokesFavoritesAsText = JSON.stringify(pokesFavorites);
    localStorage.setItem('pokesFavorites', pokesFavoritesAsText);
}


async function loadFavorites() {
    let pokesFavoritesAsText = localStorage.getItem('pokesFavorites');
    if (pokesFavoritesAsText) {
        pokesFavorites = JSON.parse(pokesFavoritesAsText);
    }
}