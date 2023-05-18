async function renderPokMiniSearch() {
    document.getElementById('miniPokesSearch').innerHTML = '';
    document.getElementById('miniPokesSearch').innerHTML = generateHTMLPokeMiniSearch();
 }

async function renderPokMiniFavorites() {
    document.getElementById('miniPokesFavorites').innerHTML = '';
    document.getElementById('miniPokesFavorites').innerHTML = generateHTMLPokeMiniFavorites();
 }