function showPokeMiniFavorites() {
    if (pokesFavorites.length == 0) {
        document.getElementById('miniPokesFavorites').innerHTML = 'Keiner hier';
    }
    if (pokesFavorites.length > 0) {
        document.getElementById('miniPokesFavorites').innerHTML = '';
        for (let i = 0; i < pokesFavorites.length; i++) {
            let favoriteId = pokesFavorites[i];
            let formatedId = format3LeftHandZeros(favoriteId);
            document.getElementById('miniPokesFavorites').innerHTML += generateHTMLPokeMiniFavorites(favoriteId, formatedId);
            renderBackgroundMiniFavorites(favoriteId);
            // changeMiniToBlackMiniFavorites(favoriteId);
        }
    }
};

function generateHTMLPokeMiniFavorites(favoriteId, formatedId) {
    return `
    <div id="miniPokeCardFavorites${favoriteId}"class="mini-poke-card">
        <button onclick="showPokeCard(${favoriteId})">
            <div id="germanNameFavorites${favoriteId}" style="color: white">${myPokesAsObject[favoriteId]['nameGerman']}</div>
            <div id="pokeMiniFavorites${favoriteId}" style="color: white"># ${formatedId}</div>
            <div class="mini-poke-img-place" id="imageFavorites${favoriteId}">
                <img src="${myPokesAsObject[favoriteId]['imgUrl']}" style="width: 160px">
            </div>
        </button>
        </div>
                `
}