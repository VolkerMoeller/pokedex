async function saveGeneralPokeDataLocalStorage() {
    let generalPokeDataAsText = JSON.stringify(generalPokeData);
    localStorage.setItem('generalPokeData', generalPokeDataAsText);
}


async function loadGeneralPokeDataLocalStorage() {
    let generalPokeDataAsText = localStorage.getItem('generalPokeData');
    if (generalPokeDataAsText) {
        generalPokeData = JSON.parse(generalPokeDataAsText);
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


// async function load() {
//     let pokesAsText = localStorage.getItem('pokes');
//     if (pokesAsText) {
//         pokes = JSON.parse(pokesAsText);
//     }
// }
// function savePokesToPokesSaved() {
//     let pokesText = JSON.stringify(pokes);
//     localStorage.setItem('pokesSaved', pokesText);
// }


// function savePokesSavedToPokes() {
//     let pokesText = JSON.stringify(pokesSaved);
//     localStorage.setItem('pokes', pokesText);
// }


// function save() {
//     let pokesText = JSON.stringify(pokes);
//     localStorage.setItem('pokes', pokesText);
// }