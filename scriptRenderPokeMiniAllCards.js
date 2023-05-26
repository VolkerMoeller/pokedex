async function renderPokMiniSearch() {
    document.getElementById('miniPokesSearch').innerHTML = '';
    document.getElementById('miniPokesSearch').innerHTML = generateHTMLPokeMiniSearch();
}

async function renderPokMiniFavorites() {
    document.getElementById('miniPokesFavorites').innerHTML = '';
    loadFavorites;
    if (pokesFavorites.length == !0) {
        document.getElementById('miniPokesFavorites').innerHTML = showPokeMiniFavorites();
    }
}